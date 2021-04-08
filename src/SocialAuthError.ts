export enum SocialAuthErrorCode {
    CLIENT_ID = "You must configure a client ID before using SocialAuth",
    IOS_ONLY = "Only available on iOS",
}

export class SocialAuthError extends Error {
    constructor(code: SocialAuthErrorCode) {
        super(code)
    }

    static withCode(code: SocialAuthErrorCode): SocialAuthError {
        return new SocialAuthError(code)
    }
}
