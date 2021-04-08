#import <React/RCTBridgeModule.h>

@import GoogleSignIn;
@import FBSDKLoginKit;
@import AuthenticationServices;

@interface RCT_EXTERN_MODULE(SocialAuth, NSObject)

RCT_EXTERN_METHOD(googleSignIn:(NSString)clientID withResolver:(RCTResponseSenderBlock)resolve)

RCT_EXTERN_METHOD(facebookSignIn:(NSString)appID withResolver:(RCTResponseSenderBlock)resolve)

RCT_EXTERN_METHOD(appleSignIn:(RCTResponseSenderBlock)resolve)

RCT_EXTERN_METHOD(signOut:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

RCT_EXTERN_METHOD(signOutProvider:(NSString)provider
                  resolver:(RCTPromiseResolveBlock)resolver
                  rejecter:(RCTPromiseRejectBlock)rejecter)

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

@end
