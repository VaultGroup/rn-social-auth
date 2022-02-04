import React from "react"
import { Image, Text, View } from "react-native"
import type { SignInButtonProps } from "./props"
import styles from "./styles"
import { TouchHandlerView } from "./TouchHandlerView"

export const FacebookSignInButton = (props: SignInButtonProps) => {
    if (props.buttonSize == "small") {
        const padding = (props.height ?? 50) / 5
        return (
            <TouchHandlerView provider="facebook" onPress={props.onPress} signInCallback={props.signInCallback}>
                <View
                    style={{
                        backgroundColor: "#1877F2",
                        height: props.height ?? 50,
                        width: props.width ?? 50,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: "#1877F2",
                    }}
                >
                    <View style={{ padding: padding }}>
                        <Image
                            height={1}
                            width={1}
                            source={require("../assets/f-logo-white.png")}
                            style={styles.imageView}
                        />
                    </View>
                </View>
            </TouchHandlerView>
        )
    }
    return (
        <TouchHandlerView provider="facebook" onPress={props.onPress} signInCallback={props.signInCallback}>
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
