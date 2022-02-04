import type { ViewStyle } from "react-native"
import type { SocialAuthResponse } from "src/SocialAuthResponse"


export interface SignInButtonProps {
    onPress?: () => void
    signInCallback?: (error: any, response: SocialAuthResponse | null) => void
    style?: ViewStyle // ignored for icon button
    borderRadius?: number
    buttonSize?: "large" | "small"
    backgroundColour?: string
    width?: 50
    height?: 50
}


export interface SocialSignInButtonProps extends SignInButtonProps {
    provider?: "apple" | "google" | "facebook" | "generic"
}