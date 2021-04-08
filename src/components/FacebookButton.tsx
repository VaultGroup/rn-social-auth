import React from "react"
import { Image, Text, View } from "react-native"
import type { SignInButtonProps } from "./props"
import { TouchHandlerView } from "./TouchHandlerView"

export const FacebookButton = (props: SignInButtonProps) => {
    return (
        <TouchHandlerView logo="facebook" onPress={props.onPress} signInCallback={props.signInCallback}>
            <View
                style={{
                    backgroundColor: "#1877F2",
                    height: 44,
                    width: 260,
                    borderRadius: props.borderRadius ?? 22,
                    paddingStart: 12,
                    paddingEnd: 8,
                    elevation: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <Image
                    source={require("../assets/f-logo-white.png")}
                    height={1}
                    width={1}
                    style={{ width: 24, height: 24, marginEnd: 16 }}
                />

                <Text style={{ color: "white", fontWeight: "500", fontSize: 19, flex: 1 }}>Login with Facebook</Text>
            </View>
        </TouchHandlerView>
    )
}
