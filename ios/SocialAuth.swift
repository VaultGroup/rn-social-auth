import GoogleSignIn
import FBSDKLoginKit
import FBSDKCoreKit
import AuthenticationServices

@objc(SocialAuth)
class SocialAuth: NSObject, GIDSignInDelegate, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
 
    var resolver: RCTResponseSenderBlock?


    @objc(googleSignIn:withResolver:)
    func googleSignIn(clientID: String, resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve

        let gid = GIDSignIn.sharedInstance()
        gid?.presentingViewController = UIApplication.shared.keyWindow!.rootViewController!
        gid?.delegate = self
        gid?.clientID = clientID
        gid?.signIn()
    }

    func sign(_ signIn: GIDSignIn?, didSignInFor user: GIDGoogleUser?, withError error: Error?) {

        if error == nil, let credential = user?.authentication, let code = credential.idToken {
            
            // GIDSignIn.sharedInstance()?.signOut()
            
            resolver?([code])

        } else {
            if let error = error {
                print(error.localizedDescription)
                resolver?([error.localizedDescription])
            } else {
                resolver?([""])
            }
        }
    }


    @objc(facebookSignIn:withResolver:)
    func facebookSignIn(appID: String, resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve

        FBSDKCoreKit.Settings.appID = appID
        
        let loginManager = LoginManager()
        
        loginManager.logIn(permissions: ["public_profile", "email"], from: UIApplication.shared.keyWindow!.rootViewController!) { (result, error) in

            if (error != nil) {

                self.resolver?(["Uknown!"])
                // Process error

            } else if result?.isCancelled == true {
                self.resolver?(["Canceld!"])
                // User Cancellation

            } else {
                //Success
                if result?.grantedPermissions.contains("email") == true && result?.grantedPermissions.contains("public_profile") == true && AccessToken.current != nil {
                        
                    let accessToken = AccessToken.current?.tokenString
                    self.resolver?([accessToken])

                } else {
                    self.resolver?(["No permissions!"])
                    //Handle error
                }
            }
        }

    }
    
    @objc(appleSignIn:)
    func appleSignIn(resolve: RCTResponseSenderBlock?) {
        self.resolver = resolve
        
        guard #available(iOS 13.0, *) else {
            resolve?([""])
            return
        }
        
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
        request.requestedScopes = [.fullName, .email]
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        authorizationController.presentationContextProvider = self
        authorizationController.performRequests()
    }
    
    @available(iOS 13.0, *)
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return UIApplication.shared.keyWindow!
    }
    
    @available(iOS 13.0, *)
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        switch authorization.credential {
            case let appleIDCredential as ASAuthorizationAppleIDCredential:
                
                // Create an account in your system.
                let userIdentifier = appleIDCredential.user
                let fullName = appleIDCredential.fullName
                let email = appleIDCredential.email
                
                self.resolver?([userIdentifier])
                // For the purpose of this demo app, store the `userIdentifier` in the keychain.
//                    self.saveUserInKeychain(userIdentifier)
//
//                    // For the purpose of this demo app, show the Apple ID credential information in the `ResultViewController`.
//                    self.showResultViewController(userIdentifier: userIdentifier, fullName: fullName, email: email)
            
            case let passwordCredential as ASPasswordCredential:
            
                // Sign in using an existing iCloud Keychain credential.
                let username = passwordCredential.user
                let password = passwordCredential.password
                
                self.resolver?([username])
                // For the purpose of this demo app, show the password credential as an alert.
//                    DispatchQueue.main.async {
//                        self.showPasswordCredentialAlert(username: username, password: password)
//                    }
                
            default:
                break
        }
    }
    
    @available(iOS 13.0, *)
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        self.resolver?([error])
    }
}
