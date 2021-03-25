import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import SocialAuth from "../SocialAuth"
import type SignInButtonProps from "./SignInButtonProps"


export const AppleButton = (props: SignInButtonProps) => {
    return (
        <TouchableOpacity onPress={() => {
            if (props.onPress !== undefined) {
                props.onPress()
            } else {
                SocialAuth.appleSignIn(props.signInCallback)
            }
        }}>

            <View style={{ width: 200, height: 50, backgroundColor: "black", elevation: 3, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Apple</Text>
            </View>

        </TouchableOpacity>
    )
}
