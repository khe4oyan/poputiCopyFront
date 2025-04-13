import { Alert, Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

import CustomInput from '@/components/custom/customInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const Login = () => {
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");

  const loginHandler = () => {
    if (login !== "" && pass !== "") {
      // TODO: send to back
    } else {
      Alert.alert("Error", "Invalid inputs");
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.headerText}>Login</Text>
      <CustomInput
        value={login}
        setValue={setLogin}
        placeholder='Login'
      />
      <CustomInput
        value={pass}
        setValue={setPass}
        placeholder='Password'
      />

      <TouchableWithoutFeedback onPress={loginHandler}>
        <Text style={styles.button}>Login</Text>
      </TouchableWithoutFeedback>

      <View style={styles.footer}>
        <Text>Dont have account?</Text>
        <Link href="/(root)/auth/register" style={styles.link}>register</Link>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  root: {
    padding: 10,
    gap: 10,
  },

  headerText: {
    textAlign: "center",
    fontSize: 40,
    marginBottom: 50,
  },

  button: {
    backgroundColor: "#ff4e00",
    color: "white",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
  },

  footer: {
    flexDirection: "row",
    gap: 10,

  },

  link: {
    color: "#ff4e00",
  }
})