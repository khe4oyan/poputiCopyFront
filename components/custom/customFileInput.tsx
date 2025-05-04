import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';

type customFileInputProps = {
  value: any,
  setValue: any,
  title?: string | number,
  placeholder?: string,
};

const CustomFileInput = ({ title, value, setValue }: customFileInputProps) => {
  const { t } = useTranslation();

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
        <Text>{value ? t('selected_file') : t('not_selected')}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>
            {value ? t('select_other_photo') : t('select_photo')}
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
    color: "#1C2A82",
    marginBottom: 4,
  },

  container: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "#1C2A82",
    color: "#1C2A82",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#1C2A82",
    padding: 10,
    borderRadius: 3,
  },

  buttonText: {
    color: "white",
  }
})
