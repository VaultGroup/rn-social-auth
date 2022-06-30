![alt text](https://github.com/VaultGroup/rn-social-auth/blob/master/example/screenshots/screenshot1.png?raw=true&s=400)

# React Native Social Authentication

A social authentication library for react native

## Installation

```sh
npm i VaultGroup/rn-social-auth
```

### Google Authentication

#### Android
Create a project in [Firebase](https://console.firebase.com). You will need a SHA1 of your debug signing key.
```sh
keytool -list <project_dir>/android/app/debug.keystore -storepass android
```

#### iOS
Create a project in [Google Cloud Console](https://console.cloud.google.com) and create an OAuth client ID in [Credentials](https://console.cloud.google.com/apis/credentials)

This library uses CocoaPods
```sh
cd <project_dir>/ios

pod install
```

As this library was built using Swift, your project will need to have a bridging header file.
```sh
open <project_dir>/ios/<ProjectName>.xcworkspace
```

Add a new Swift file in the projects main directory, beside the AppDelegate.h. XCode will prompt you to automatically create a bridging header.


### Facebook Authentication

#### iOS & Android
The only field that must be correct is the package name of both of your apps. The `Launch Activity` is not used so you can put anything you like here


### Apple Authentication

Please note that Sign in with Apple is only available on iOS. You must follow the guidelines Apple has set so make sure you check our their developer documentation


### Native Application Setup

#### iOS

In your app delegate, you need to handle redirect urls.

```objc
@import GoogleSignIn;
@import FBSDKCoreKit;

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  if ([[GIDSignIn sharedInstance] handleURL:url]) {
    return YES;
  }

  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }

  return NO;
}
```

info.plist add the following URL schemes, replacing with your information where appropriate

```
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string><Google Url Scheme></string>
        </array>
    </dict>

    <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLSchemes</key>
    <array>
        <string>fb<Facebook App ID></string>
    </array>
    </dict>
</array>
```

#### Android
No other setup is required for Android


## Usage

```js
import { Config, AppleButton, FacebookButton, GenericEmailButton, GoogleButton, IconButton } from 'react-native-social-auth';

//...

Config.googleClientID = "<Google Client ID>"
Config.facebookAppID = "<Facebook App ID>"

const signInResponse = (response: any) => {
    // do something
}

//...
<GenericEmailButton onPress={()=>{ /* manually handle sign in */}}/>

<GoogleButton signInCallback={signInResponse} />

<FacebookButton signInCallback={signInResponse} />

<AppleButton signInCallback={signInResponse} />

<IconButton logo="apple" signInCallback={signInResponse} />

<IconButton logo="google" signInCallback={signInResponse} />

<IconButton logo="facebook" signInCallback={signInResponse} />

<IconButton logo="email" signInCallback={signInResponse} />
```

## Running the Example Project
```
// install the module deps
npm i

// All further commands from within the example project
cd example

// install the module into the example project
npm i ../

// install pods
npx pod-install

// start the packager (in the example project)
npm start

// optionally, use the vs code launch script "Attach to packager"
// to debug JS code
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Bootstrapped with

```sh
npx create-react-native-library
```
