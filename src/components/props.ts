import type { ViewStyle } from "react-native";

export interface LogoStyleProps {
    logo: "apple" | "google" | "facebook" | "email"
}

export interface SignInButtonProps {
    onPress?: () => void
    signInCallback?: (response: any) => void
    style?: ViewStyle // ignored for icon button
    borderRadius?: number
}
  
export interface IconButtonProps extends SignInButtonProps, LogoStyleProps {
    width?: 50
    height?: 50
    backgroundColour?: string
}
