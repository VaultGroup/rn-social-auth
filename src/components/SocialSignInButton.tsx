import React from "react"
import { AppleSignInButton, FacebookSignInButton, GenericSignInButton, GoogleSignInButton } from "."
import type { SocialSignInButtonProps } from "./props"

export const SocialSignInButton = (props: SocialSignInButtonProps) => {

    switch (props.provider) {
        case "apple":
            return <AppleSignInButton {...props} />

        case "google":
            return <GoogleSignInButton {...props} />

        case "facebook":
            return <FacebookSignInButton {...props} />

        default:
            return <GenericSignInButton {...props} />
    }
}
