#import <React/RCTBridgeModule.h>

@import GoogleSignIn;
@import FBSDKLoginKit;
@import AuthenticationServices;

@interface RCT_EXTERN_MODULE(SocialAuth, NSObject)

RCT_EXTERN_METHOD(googleSignIn:(NSString)clientID withResolver:(RCTResponseSenderBlock)resolve)

RCT_EXTERN_METHOD(facebookSignIn:(NSString)appID withResolver:(RCTResponseSenderBlock)resolve)

RCT_EXTERN_METHOD(appleSignIn:(RCTResponseSenderBlock)resolve)

RCT_EXTERN_METHOD(signOut:(NSString)token
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(signOutProvider:(NSString)token
                  provider:(NSString)provider
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

@end
