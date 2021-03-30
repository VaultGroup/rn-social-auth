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
        
        DispatchQueue.main.async {
            let gid = GIDSignIn.sharedInstance()
            gid?.presentingViewController = UIApplication.shared.keyWindow!.rootViewController!
            gid?.delegate = self
            gid?.clientID = clientID
            gid?.signIn()
        }
    }

    func resolveWith(token: String?, firstName: String?, lastName: String?, email: String?, phone: String?, imageUrl: String?) {
        let response = SocialAuthResponse(
            token: token ?? "",
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            email: email ?? "",
            phone: phone ?? "",
            imageUrl: imageUrl ?? ""
        )
        
        resolver?([NSNull(), response.toDictionary])
    }

    func resolveWith(error: Error?, orString string: String = "Uknown Error") {
        resolver?([error?.localizedDescription ?? string, NSNull()])
    }

    func sign(_ signIn: GIDSignIn?, didSignInFor user: GIDGoogleUser?, withError error: Error?) {

        if error == nil, let credential = user?.authentication, let code = credential.idToken, let profile = user?.profile {
            
            self.resolveWith(
                token: code,
                firstName: profile.givenName ?? "",
                lastName: profile.familyName ?? "",
                email: profile.email ?? "",
                phone: "",
                imageUrl: profile.imageURL(withDimension: 400)?.path ?? ""
            )

        } else {
            self.resolveWith(error: error)
        }
    }


    @objc(facebookSignIn:withResolver:)
    func facebookSignIn(appID: String, resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve
        DispatchQueue.main.async {
            
            FBSDKCoreKit.Settings.appID = appID
            
            ApplicationDelegate.initializeSDK(nil)
            
            let loginManager = LoginManager()
            
            loginManager.logIn(permissions: ["public_profile", "email"], from: UIApplication.shared.keyWindow!.rootViewController!) { (result, error) in
                
                if (error != nil) {
                    
                    self.resolveWith(error: error)
                    
                    
                } else if result?.isCancelled == true {
                    
                    self.resolveWith(error: nil, orString: "Operation Cancelled")
                    
                    
                } else {
                    
                    if result?.grantedPermissions.contains("email") == true
                        && result?.grantedPermissions.contains("public_profile") == true,
                        let accessToken = AccessToken.current?.tokenString {
                        
                        GraphRequest(graphPath: "me", parameters: ["fields":"first_name,last_name,email,picture.width(640)"]).start{ (connection, result, error) in
                            
                            guard let result = result as? [String:Any] else {
                                return
                            }
                            
                            let pictureObject = result["picture"] as? [String: [String: Any]]
                            
                            self.resolveWith(
                                token: accessToken,
                                firstName: result["first_name"] as? String,
                                lastName: result["last_name"] as? String,
                                email: result["email"] as? String,
                                phone: result["phone"] as? String,
                                imageUrl: pictureObject?["data"]?["url"] as? String
                            )
                        }
                        
                    } else {
                        
                        self.resolveWith(error: nil, orString: "No permissions granted")
                    }
                }
            }
        }
    }
    
    @objc(appleSignIn:)
    func appleSignIn(resolve: RCTResponseSenderBlock?) {
        self.resolver = resolve
        
        guard #available(iOS 13.0, *) else {
            self.resolveWith(error: nil, orString: "You must be using iOS 13 or newer")
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
            case let credential as ASAuthorizationAppleIDCredential:
                
                // Create an account in your system.
                let userIdentifier = credential.user
                let firstName = credential.fullName?.givenName
                let lastName = credential.fullName?.familyName
                let email = credential.email
                
                self.resolveWith(
                    token: userIdentifier,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: "",
                    imageUrl: ""
                )
                
            case let /*passwordCredential*/_ as ASPasswordCredential:
            
                // Sign in using an existing iCloud Keychain credential.
//                let username = passwordCredential.user
//                let password = passwordCredential.password
                
                self.resolveWith(error: nil, orString: "Unsupported")
                
            default:
                break
        }
    }
    
    @available(iOS 13.0, *)
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        self.resolveWith(error: error)
    }
}
