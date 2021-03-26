import React from "react"
import { Image, Text, View } from "react-native"
import type { SignInButtonProps } from "./props"
import { TouchHandlerView } from "./TouchHandlerView"


export const GoogleButton = (props: SignInButtonProps) => {
    return (
      <TouchHandlerView logo="google" onPress={props.onPress} signInCallback={props.signInCallback}>

        <View style={{ backgroundColor: "#4285F4", height: 44, width: 260, borderRadius: props.borderRadius ?? 22, paddingStart: 2, elevation: 3, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>

          <View style={{backgroundColor: "white", padding:8, borderRadius: (props.borderRadius ?? 22) - 2, alignItems:"center", justifyContent: "center", marginRight: 9}}>
              <Image source={require("../assets/g-logo.png")} height={1} width={1} style={{ width: 24, height: 24, }}/>
          </View>

          <Text style={{ color: "white", fontWeight: "500", fontSize: 19, flex: 1}}>Sign in with Google</Text>

        </View>

      </TouchHandlerView>
    )
}
  
