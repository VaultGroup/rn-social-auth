import type { ViewStyle } from "react-native"
import type { SocialAuthResponse } from "src/SocialAuthResponse"

export interface LogoStyleProps {
    logo: "apple" | "google" | "facebook" | "email"
}

export interface SignInButtonProps {
    onPress?: () => void
    signInCallback?: (error: any, response: SocialAuthResponse | null) => void
    style?: ViewStyle // ignored for icon button
    borderRadius?: number
}

export interface IconButtonProps extends SignInButtonProps, LogoStyleProps {
    width?: 50
    height?: 50
    backgroundColour?: string
}
