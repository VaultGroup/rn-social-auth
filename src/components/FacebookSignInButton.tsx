import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { facebookSignIn } from "../SocialAuth"
import type SignInButtonProps from "./SignInButtonProps"


export const FacebookButton = (props: SignInButtonProps) => {
    return (
        <TouchableOpacity onPress={() => {
            console.log("okay")
            if (props.onPress !== undefined) {
                props.onPress()
            } else {
                facebookSignIn(props.signInCallback)
            }
        }}>

            <View style={{ width: 200, height: 50, backgroundColor: "#4579DE", elevation: 3, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white" }}>Facebook</Text>
            </View>

        </TouchableOpacity>
    )
}
