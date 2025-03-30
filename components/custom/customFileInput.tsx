import { StyleSheet, Text, TextInput, View, Button, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

type customFileInputProps = {
  value: any,
  setValue: any,
  title?: string | number,
  placeholder?: string,
};

const CustomFileInput = ({ title, value, setValue }: customFileInputProps) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.root}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.container}>
        <Text>{value ? "selected 1 file" : "(not selected)"}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>
            {value ? "Select other photo" : "Select photo"}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default CustomFileInput;

const styles = StyleSheet.create({
  root: {
    // padding: 12,
  },

  title: {
    color: "#ff4e00",
    marginBottom: 4,
  },

  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "#ff4e00",
    color: "#ff4e00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#ff4e00",
    padding: 10,
    borderRadius: 3,
  },

  buttonText: {
    color: "white",
  }
})