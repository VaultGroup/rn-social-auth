import GoogleSignIn
import FBSDKLoginKit
import FBSDKCoreKit
import AuthenticationServices

@objc(SocialAuth)
class SocialAuth: NSObject, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
 
    var resolver: RCTResponseSenderBlock?
    
    @objc(signOut:resolver:rejecter:)
    func signOut(facebookAppID: String, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        
        if googleSignOut() {
            resolver(true)
            return
        }
        
        if facebookSignOut(facebookAppID) {
            resolver(true)
            return
        }
        
        rejecter("sign_out_failed", "Unable to sign out. Are you signed in?", nil)
    }
    
    @objc(signOutProvider:provider:resolver:rejecter:)
    func signOutProvider(appID: String, provider: String, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
        
        switch provider {
        
            case "apple":
                // Apple Sign In do not support sign out however
                // resolve this to true as opposed to the
                // rejecter firing
                resolver(true)
                return
                
            case "google":
                if googleSignOut() {
                    resolver(true)
                    return
                }
                
            case "facebook":
                if facebookSignOut(appID) {
                    resolver(true)
                    return
                }
                
            default: break
        }
        
        rejecter("sign_out_failed", "Unable to sign out of \(provider). Are you signed in?", nil)
    }
    
    
    func googleSignOut() -> Bool {
        let gid = GIDSignIn.sharedInstance
        
        if gid.currentUser != nil {
            gid.signOut()
            return true
        }
        
        return false
    }
    
    func facebookSignOut(_ appID: String) -> Bool {
        
        FBSDKCoreKit.Settings.shared.appID = appID
        
        ApplicationDelegate.shared.initializeSDK()
        
        if AccessToken.current != nil {
            let loginManager = LoginManager()
            loginManager.logOut()
            return true
        }
            
        return false
    }

    @objc(googleSignIn:withResolver:)
    func googleSignIn(clientID: String, resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve

        GIDSignIn.sharedInstance.signIn(with: GIDConfiguration(clientID: clientID), presenting: UIApplication.shared.keyWindow!.rootViewController!) { user, error in
            
            if error == nil, let credential = user?.authentication, let code = credential.idToken, let profile = user?.profile {
                
                self.resolveWith(
                    token: code,
                    firstName: profile.givenName ?? "",
                    lastName: profile.familyName ?? "",
                    email: profile.email,
                    phone: "",
                    imageUrl: profile.imageURL(withDimension: 400)?.absoluteString ?? ""
                )
                
            } else {
                self.resolveWith(error: error)
            }
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


    @objc(facebookSignIn:withResolver:)
    func facebookSignIn(appID: String, resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve
            
        FBSDKCoreKit.Settings.shared.appID = appID
        
        ApplicationDelegate.shared.initializeSDK()
        
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
        if let credential = authorization.credential as? ASAuthorizationAppleIDCredential,
            let token = credential.identityToken,
            let tokenString = String(data: token, encoding: .utf8)
        {
                
            let firstName = credential.fullName?.givenName
            let lastName = credential.fullName?.familyName
            let email = credential.email
            
            self.resolveWith(
                token: tokenString,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: "",
                imageUrl: ""
            )
                
        } else {

            self.resolveWith(error: nil, orString: "Unsupported")
        }
    }
    
    @available(iOS 13.0, *)
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        self.resolveWith(error: error)
    }
}
