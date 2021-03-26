import * as React from 'react';

import { StyleSheet, View, Text, Platform } from 'react-native';
import { AppleButton, Config, FacebookButton, GenericEmailButton, GoogleButton, IconButton } from 'social-auth';


if (Platform.OS == "android") {
    Config.googleClientID = "539083112611-var842hv7fn4sj8q92suirkrrm7nhl5f.apps.googleusercontent.com"
} else {
    Config.googleClientID = "641945122723-6oqbto3q4hfuedpksehpk9hjvik3ieil.apps.googleusercontent.com"
}
Config.facebookAppID = "788977271724922"



export default function App() {
  const [result, setResult] = React.useState<string | null>();

  const signInResponse = (response: any) => {
      setResult(response)
  }

  const appleSignInButton= () => {

    if (Platform.OS == "android") {
        return null
    } else {
        return(
            <View>

                <AppleButton signInCallback={signInResponse} />

                <View style={{height: 24}} />

            </View>
        )
    }
  }
  return (
    <View style={styles.container} >

    <GenericEmailButton onPress={()=>{}}/>

    <View style={{height: 24}} />

    <Text>
        Or sign in with:
    </Text>
    <View style={{height: 24}} />

    { appleSignInButton() }

    <GoogleButton signInCallback={signInResponse} style={{ backgroundColor:"red" }}/>

    <View style={{height: 24}} />

    <FacebookButton signInCallback={signInResponse} />

    <View style={{height: 24}} />

    <View style={{flexDirection:"row", justifyContent:"space-evenly", width :"60%"}}>

    <IconButton logo="apple" signInCallback={signInResponse} />

    <IconButton logo="google" signInCallback={signInResponse} />

    <IconButton logo="facebook" signInCallback={signInResponse} />

    <IconButton logo="email" signInCallback={signInResponse} />

    </View>

    <View style={{height: 48}} />
        <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
