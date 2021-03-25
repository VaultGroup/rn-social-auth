import type { ViewStyle } from "react-native";

export default interface SignInButtonProps {
    onPress?: () => void
    signInCallback: (response: any) => void
    style?: ViewStyle
}
  