import * as React from "react"

import { StyleSheet, View, Text, Platform, ScrollView, SafeAreaView, Button } from "react-native"
import {
    Config,
    AppleButton,
    FacebookButton,
    GenericEmailButton,
    GoogleButton,
    IconButton,
    SocialAuthResponse,
    signOut,
} from "social-auth"

if (Platform.OS == "android") {
    Config.googleClientID = "539083112611-var842hv7fn4sj8q92suirkrrm7nhl5f.apps.googleusercontent.com"
} else {
    Config.googleClientID = "641945122723-6oqbto3q4hfuedpksehpk9hjvik3ieil.apps.googleusercontent.com"
}
Config.facebookAppID = "788977271724922"

export default function App() {

    const [result, setResult] = React.useState<string | null>()
    const [response, setResponse] = React.useState<SocialAuthResponse | null>()

    const signInResponse = (_error: any, response: SocialAuthResponse | null) => {
        setResponse(response)
        setResult(
            response?.token +
                "\n" +
                response?.firstName +
                "\n" +
                response?.lastName +
                "\n" +
                response?.email +
                "\n" +
                response?.phone +
                "\n" +
                response?.imageUrl +
                "\n"
        )
    }

    const appleSignInButton = () => {
        if (Platform.OS == "android") {
            return null
        } else {
            return (
                <View>
                    <AppleButton signInCallback={signInResponse} />

                    <View style={{ height: 24 }} />
                </View>
            )
        }
    }

    const onSignOutPressed = async () => {
        let success = await signOut(response?.identityProvider)
        setResult(success ? "Signed out" : "Error signing out")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingVertical: 0 }}>
                <View style={styles.container}>
                    <GenericEmailButton onPress={() => {}} />

                    <View style={{ height: 24 }} />

                    {appleSignInButton()}

                    <GoogleButton signInCallback={signInResponse} style={{ backgroundColor: "red" }} />

                    <View style={{ height: 24 }} />

                    <FacebookButton signInCallback={signInResponse} />

                    <View style={{ height: 24 }} />

                    <View style={styles.iconButtonContainer}>
                        {Platform.OS == "android" ? null : <IconButton logo="apple" signInCallback={signInResponse} />}

                        <IconButton logo="google" signInCallback={signInResponse} />

                        <IconButton logo="facebook" signInCallback={signInResponse} />

                        <IconButton logo="email" signInCallback={signInResponse} />
                    </View>

                    <View style={{ marginVertical: 24}}>
                        <Button title="Sign out" onPress={onSignOutPressed} />
                    </View>

                    <View style={{ paddingVertical: 24 }}>
                        <Text selectable={true}>{result}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iconButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "60%",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 100,
        paddingHorizontal: 24,
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
})
