import React from "react"
import { Image, Text, View } from "react-native"
import type { SignInButtonProps } from "./props"
import { TouchHandlerView } from "./TouchHandlerView"

export const AppleButton = (props: SignInButtonProps) => {
    return (
        <TouchHandlerView logo="apple" onPress={props.onPress} signInCallback={props.signInCallback}>
            <View
                style={{
                    backgroundColor: "black",
                    height: 44,
                    width: 260,
                    borderRadius: props.borderRadius ?? 22,
                    paddingEnd: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 3,
                    flexDirection: "row",
                }}
            >
                <View>
                    <Image
                        source={require("../assets/a-logo-white.png")}
                        height={1}
                        width={1}
                        style={{ width: 24, height: 24, marginStart: 12, marginBottom: 3, marginEnd: 16 }}
                    />
                </View>

                <Text style={{ color: "white", fontWeight: "500", fontSize: 19, flex: 1 }}>Sign in with Apple</Text>
            </View>
        </TouchHandlerView>
    )
}
