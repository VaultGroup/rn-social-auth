import React from "react"
import { Image, Text, View } from "react-native"
import type { SignInButtonProps } from "./props"
import styles from "./styles"
import { TouchHandlerView } from "./TouchHandlerView"

export const AppleSignInButton = (props: SignInButtonProps) => {
    if (props.buttonSize == "small") {
        const padding = (props.height ?? 50) / 5

        return (
            <TouchHandlerView provider="apple" onPress={props.onPress} signInCallback={props.signInCallback}>
                <View
                    style={{
                        backgroundColor: "black",
                        height: props.height ?? 50,
                        width: props.width ?? 50,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                >
                    <View style={{ padding: padding }}>
                        <Image
                            height={1}
                            width={1}
                            source={require("../assets/a-logo-white.png")}
                            style={styles.imageView}
                        />
                    </View>
                </View>
            </TouchHandlerView>
        )
    } else {
        return (
            <TouchHandlerView provider="apple" onPress={props.onPress} signInCallback={props.signInCallback}>
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
}
