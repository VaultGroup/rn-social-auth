#import <React/RCTBridgeModule.h>

@import GoogleSignIn;

@interface RCT_EXTERN_MODULE(SocialAuth, NSObject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(googleSignIn:(NSString)username
                 withResolver:(RCTResponseSenderBlock)resolve)

@end
