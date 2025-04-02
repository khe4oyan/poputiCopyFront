import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

type customInputProps = {
  value: any,
  setValue: any,
  title?: string | number,
  placeholder?: string,
  type?: KeyboardTypeOptions,
};

const CustomInput = ({ title, value, setValue, placeholder, type = "default" }: customInputProps) => {
  return (
    <View style={styles.root}>
      { title && <Text style={styles.title}>{title}</Text> }
      
      <TextInput
        value={value}
        onChange={setValue}
        style={styles.input}
        placeholder={placeholder}
        keyboardType={type}
        placeholderTextColor="gray"
      />
    </View>
  )
}

export default CustomInput;

const styles = StyleSheet.create({
  root: {
    // padding: 12,
  },

  title: {
    color: "#ff4e00",
    marginBottom: 4,
  },

  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "#ff4e00",
    color: "#ff4e00"
  },
})