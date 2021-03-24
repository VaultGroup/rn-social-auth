import GoogleSignIn

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
        // self.rejecter = reject

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
}
