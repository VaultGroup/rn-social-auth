import { NativeModules } from 'react-native';
import { Config } from "./config";

type SocialAuthType = {
    googleSignIn(clientID: string, resolve: (response: string | string[] | null) => void): Promise<void>;
    facebookSignIn(appID: string, resolve: (response: string | string[] | null) => void): Promise<void>;
    appleSignIn(resolve: (response: string | string[] | null) => void): Promise<void>;
};

const { SocialAuth } = NativeModules;

const Caller = SocialAuth as SocialAuthType

/**
 * Make sure you have configured SocialAuth's googleClientId before calling
 * this function
 * @param callback A response object returned from google or an error otherwise
 */
export const googleSignIn = (callback: (response: string | string[] | null) => void) => {
    if (Config.googleClientID === undefined || Config.googleClientID.length == 0) {
        const error = "You must configure a client ID before using SocialAuth"
        console.warn(error)
        throw Error(error)
    }

    Caller.googleSignIn(Config.googleClientID, callback)
}

/**
 * Make sure you have configured SocialAuth's facebookAppId before calling
 * this function
 * @param callback A response object returned from google or an error otherwise
 */
export const facebookSignIn = (callback: (response: string | string[] | null) => void) => {
    if (Config.facebookAppID === undefined || Config.facebookAppID.length == 0) {
        const error = "You must configure a client ID before using SocialAuth"
        console.warn(error)
        throw Error(error)
    }

    Caller.facebookSignIn(Config.facebookAppID, callback)
}

export const appleSignIn = () => {

}

export default SocialAuth as SocialAuthType;
