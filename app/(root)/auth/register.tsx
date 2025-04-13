import { Alert, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

import CustomInput from '@/components/custom/customInput'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import API from '@/utils/API';
import CustomDropDownMenu from '@/components/custom/customDropDownMenu';
import { useRouter } from 'expo-router';

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [role, setRole] = React.useState(0);

  const router = useRouter();

  const roles = [
    "driver", 
    "student"
  ];

  const registerHandler = () => {
    if (email !== "" && pass !== "") {
      API.authRegister(email, pass, roles[role])
        .then(d => {
          if (d?.data) {
            router.replace("/auth/login");
            Alert.alert("Success", "You're registered!");
          } else {
            Alert.alert("Error", "Invalid server response");
          }
        })
    } else {
      Alert.alert("Error", "Invalid inputs");
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.headerText}>Registration</Text>
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder='mail'
      />
      <CustomInput
        value={pass}
        setValue={setPass}
        placeholder='Password'
      />

      <CustomDropDownMenu
        options={roles}
        setValueIndex={setRole}
        valueIndex={role}
        title="Role"
      />

      <TouchableWithoutFeedback onPress={registerHandler}>
        <Text style={styles.button}>Register</Text>
      </TouchableWithoutFeedback>

      <View style={styles.footer}>
        <Text>Already have account?</Text>
        <Link href="/(root)/auth/login" style={styles.link}>login</Link>
      </View>
    </SafeAreaView>
  )
}

export default Register

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