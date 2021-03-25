import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SocialAuth from 'social-auth';

export default function App() {
  const [result, setResult] = React.useState<string | null>();

  const googleSignIn = () => {
    SocialAuth.googleSignIn("", (value) => {
      setResult(value)
    });
  }

  const facebookSignIn = () => {
    SocialAuth.facebookSignIn((value) => {
      setResult(value)
    })
  }

  return (
    <View style={styles.container} >

    <TouchableOpacity onPress={googleSignIn}>
      <View style={{width: 200, height: 50, backgroundColor: "#4579DE", elevation: 3, alignItems: "center", justifyContent: "center"}}>
        <Text style={{color: "white"}}>Google</Text>
      </View>
    </TouchableOpacity>

    <View style={{height: 24}} />

  <TouchableOpacity onPress={facebookSignIn}>
    <View style={{width: 200, height: 50, backgroundColor: "#4579DE", elevation: 3, alignItems: "center", justifyContent: "center"}}>
      <Text style={{color: "white"}}>Facebook</Text>
    </View>
  </TouchableOpacity>

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
