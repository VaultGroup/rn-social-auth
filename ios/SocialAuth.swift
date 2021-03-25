import GoogleSignIn
import FBSDKLoginKit
import FBSDKCoreKit

@objc(SocialAuth)
class SocialAuth: NSObject, GIDSignInDelegate {

    var resolver: RCTResponseSenderBlock?

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }

    @objc(googleSignIn:withResolver:)
    func googleSignIn(username: String, resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve

        let gid = GIDSignIn.sharedInstance()
        gid?.presentingViewController = UIApplication.shared.keyWindow!.rootViewController!
        gid?.delegate = self
        gid?.clientID = "641945122723-6oqbto3q4hfuedpksehpk9hjvik3ieil.apps.googleusercontent.com"
        gid?.signIn()
    }

    func sign(_ signIn: GIDSignIn?, didSignInFor user: GIDGoogleUser?, withError error: Error?) {

        if error == nil, let credential = user?.authentication, let code = credential.idToken {
            
            GIDSignIn.sharedInstance()?.signOut()
            
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


    @objc(facebookSignIn:)
    func facebookSignIn(resolve: RCTResponseSenderBlock?) -> Void {
        self.resolver = resolve

        FBSDKCoreKit.Settings.appID = "788977271724922"
        
        
        let loginManager = LoginManager()
        
        loginManager.logIn(permissions: ["public_profile", "email"], from: UIApplication.shared.keyWindow!.rootViewController!) { (result, error) in
            if (error != nil) {
                self.resolver?(["Uknown!"])
                // Process error
                // self.removeFbData()
            } else if result?.isCancelled == true {
                self.resolver?(["Canceld!"])
                // User Cancellation
                // self.removeFbData()
            } else {
                //Success
                if result?.grantedPermissions.contains("email") == true && result?.grantedPermissions.contains("public_profile") == true{
                    //Do work
                    self.fetchFacebookProfile()
                    
                } else {
                    self.resolver?(["No permissions!"])
                    //Handle error
                }
            }
        }

    }

    func fetchFacebookProfile() {
        if AccessToken.current != nil {
            
            let accessToken = AccessToken.current?.tokenString
//            let fbUser = ["accessToken": accessToken, "user": result]
            
            resolver?([accessToken])
            
//            let graphRequest = FBSDKGraphRequest(graphPath: "me", parameters: nil)
//            graphRequest.startWithCompletionHandler({ (connection, result, error) -> Void in
//
//                if ((error) != nil) {
//                    resolver?(["Error!"])
//                    //Handle error
//                } else {
//                    //Handle Profile Photo URL String
//                    let userId =  result["id"] as! String
//                    let profilePictureUrl = "https://graph.facebook.com/\(id)/picture?type=large"
//
//                    let accessToken = AccessToken.currentAccessToken().tokenString
//                    let fbUser = ["accessToken": accessToken, "user": result]
//
//                    resolver?([accessToken])
//                }
//            })
        }
    }
}
