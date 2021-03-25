import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { googleSignIn } from "../SocialAuth"
import type SignInButtonProps from "./SignInButtonProps"


export const GoogleButton = (props: SignInButtonProps) => {
    return (
      <TouchableOpacity onPress={() => {
        if (props.onPress) {
          props.onPress()
        } else {
          googleSignIn(props.signInCallback)
        }
      }}>
  
        <View style={{width: 200, height: 50, backgroundColor: "#4579DE", elevation: 3, alignItems: "center", justifyContent: "center", ...props.style}}>
          <Text style={{color: "white"}}>Google</Text>
        </View>
  
      </TouchableOpacity>
    )
  }
  