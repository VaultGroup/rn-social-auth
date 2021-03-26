import React from "react"
import { TouchableOpacity } from "react-native"
import type { LogoStyleProps } from "./props"
import * as SocialAuth from "../SocialAuth"


interface TouchHandlerViewProps extends LogoStyleProps {
    onPress?: () => void
    signInCallback?: (response: any) => void
    children?: JSX.Element | JSX.Element[]
}

export const TouchHandlerView = (props: TouchHandlerViewProps) => {

    const onPressed = () => {

        if (props.onPress !== undefined) {
            props.onPress()
            
        } else if (props.signInCallback !== undefined) {
            // facebookSignIn(props.signInCallback)

            switch (props.logo) {

                case "facebook":
                    SocialAuth.facebookSignIn(props.signInCallback)
                    break;

                case "google":
                    SocialAuth.googleSignIn(props.signInCallback)
                    break;

                case "apple":
                    SocialAuth.appleSignIn(props.signInCallback)
                    break;

                default:  // generic email/password
                    break;
            }
        }
    }

    return (
        <TouchableOpacity onPress={onPressed}>
            {props.children}
        </TouchableOpacity>
    )
}
