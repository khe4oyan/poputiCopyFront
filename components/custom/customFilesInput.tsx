import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

const CustomFilesInput = ({ title, value, setValue }: any) => {
  const { t } = useTranslation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uris = result.assets.map(asset => asset.uri);
      setValue(uris);
    }
  };

  return (
    <View style={styles.root}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.container}>
        <Text>
          {value.length > 0
            ? `${value.length} files be selected`
            : "(not selected)"}
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>
            {value.length > 0 ? "Select other photos" : "Select photos"}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default CustomFilesInput;

const styles = StyleSheet.create({
  root: {
    // padding: 12,
  },

  title: {
    color: "#A55CCF",
    marginBottom: 4,
  },

  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "#A55CCF",
    color: "#A55CCF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#A55CCF",
    padding: 10,
    borderRadius: 3,
  },

  buttonText: {
    color: "white",
  }
})
