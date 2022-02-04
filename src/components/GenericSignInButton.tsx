import React from "react"
import { Image, Text, View } from "react-native"
import type { SignInButtonProps } from "./props"
import styles from "./styles"
import { TouchHandlerView } from "./TouchHandlerView"

export const GenericSignInButton = (props: SignInButtonProps) => {
    if (props.buttonSize == "small") {
        const padding = (props.height ?? 50) / 5
        return (
            <TouchHandlerView provider="generic" onPress={props.onPress} signInCallback={props.signInCallback}>
                <View
                    style={{
                        backgroundColor: "white",
                        height: props.height ?? 50,
                        width: props.width ?? 50,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: "black",
                    }}
                >
                    <View style={{ padding: padding }}>
                        <Image height={1} width={1} source={require("../assets/env.png")} style={styles.imageView} />
                    </View>
                </View>
            </TouchHandlerView>
        )
    } else {
        return (
            <TouchHandlerView provider="generic" onPress={props.onPress} signInCallback={props.signInCallback}>
                <View
                    style={{
                        backgroundColor: "white",
                        height: 44,
                        width: 260,
                        borderWidth: 1,
                        borderRadius: 22,
                        paddingStart: 12,
                        paddingEnd: 8,
                        elevation: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <Image
                        source={require("../assets/env-white.png")}
                        height={1}
                        width={1}
                        style={{ width: 24, height: 24, marginEnd: 16 }}
                    />

                    <Text style={{ color: "black", fontWeight: "500", fontSize: 19, flex: 1 }}>Sign in with email</Text>
                </View>
            </TouchHandlerView>
        )
    }
}
