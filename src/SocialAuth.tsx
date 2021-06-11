import { NativeModules, Platform } from "react-native"
import { SocialAuthError, SocialAuthErrorCode } from "social-auth"
import { Config } from "./config"
import type { IdentityProvider, SocialAuthResponse } from "./SocialAuthResponse"

type SocialAuthType = {
    googleSignIn(
        clientID: string,
        resolve: (error: string | null, response: SocialAuthResponse | null) => void
    ): Promise<void>

    facebookSignIn(
        appID: string,
        resolve: (error: string | null, response: SocialAuthResponse | null) => void
    ): Promise<void>

    appleSignIn(resolve: (error: string | null, response: SocialAuthResponse | null) => void): Promise<void>

    signOut(facebookAppID?: string): Promise<boolean>

    signOutProvider(appID: string|undefined, provider: string): Promise<boolean>
}

const { SocialAuth } = NativeModules

const Caller = SocialAuth as SocialAuthType

export const isProviderInvalid = (provider: IdentityProvider): boolean => {
    switch (provider) {
        case "google":
            if (Config.googleClientID === undefined || Config.googleClientID.length == 0) {
                console.warn(SocialAuthError.withCode(SocialAuthErrorCode.CLIENT_ID))
                return true
            } else {
                return false
            }

        case "apple":
            if (Platform.OS === "android") {
                console.error(SocialAuthError.withCode(SocialAuthErrorCode.IOS_ONLY))
                return true
            } else {
                return false
            }

        case "facebook":
            if (Config.facebookAppID === undefined || Config.facebookAppID.length == 0) {
                console.warn(SocialAuthError.withCode(SocialAuthErrorCode.CLIENT_ID))
                return true
            } else {
                return false
            }
    }
}

export const signOut = async (provider?: IdentityProvider): Promise<boolean> => {
    var success = false

    if (provider) {
        if (isProviderInvalid(provider)) {
            return false
        }

        switch (provider) {

            case "apple":
                success = await Caller.signOutProvider(undefined, provider)
                break

            case "google":
                success = await Caller.signOutProvider(Config.googleClientID, provider)
                break

            case "facebook":
                success = await Caller.signOutProvider(Config.facebookAppID, provider)
                break
        }

    } else {
        success = await Caller.signOut(Config.facebookAppID)
    }

    return success
}

/**
 * Make sure you have configured SocialAuth's googleClientId before calling
 * this function
 * @param callback A response object returned from google or an error otherwise
 */
export const googleSignIn = (callback: (error: string | null, response: SocialAuthResponse | null) => void) => {
    if (isProviderInvalid("google")) {
        throw SocialAuthError.withCode(SocialAuthErrorCode.CLIENT_ID)
    }

    Caller.googleSignIn(Config.googleClientID!, createCallback("google", callback))
}

/**
 * Make sure you have configured SocialAuth's facebookAppId before calling
 * this function
 * @param callback A response object returned from google or an error otherwise
 */
export const facebookSignIn = (callback: (error: string | null, response: SocialAuthResponse | null) => void) => {
    if (isProviderInvalid("facebook")) {
        throw SocialAuthError.withCode(SocialAuthErrorCode.CLIENT_ID)
    }

    Caller.facebookSignIn(Config.facebookAppID!, createCallback("facebook", callback))
}

export const appleSignIn = (callback: (error: string | null, response: SocialAuthResponse | null) => void) => {
    if (isProviderInvalid("apple")) {
        console.error(SocialAuthError.withCode(SocialAuthErrorCode.IOS_ONLY))
    }

    Caller.appleSignIn(createCallback("apple", callback))
}

const createCallback = (
    provider: IdentityProvider,
    resolve: (error: string | null, response: SocialAuthResponse | null) => void
): ((error: string | null, response: SocialAuthResponse | null) => void) => {
    return (error, resolver) => {
        if (resolver != null) {
            resolver.identityProvider = provider
        }
        resolve(error, resolver)
    }
}

export default SocialAuth as SocialAuthType
