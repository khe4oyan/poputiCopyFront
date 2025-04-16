import { StyleSheet, Text, View, ScrollView, Button, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import CustomInput from '@/components/custom/customInput'
import CustomFileInput from '@/components/custom/customFileInput'
import CustomDropDownMenu from '@/components/custom/customDropDownMenu'
import { useRouter } from 'expo-router'

import React from 'react'
import API from '@/utils/API'
import useToken from '@/customHooks/useToken'
import { useTranslation } from 'react-i18next';

const PersonalData = () => {
  const { t } = useTranslation();
  
  const [phoneNum, setPhoneNum] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthDay, setBirthDay] = React.useState("");
  const [residence, setResidence] = React.useState("");
  const [genderInd, setGenderInd] = React.useState(0);
  const [roleInd, setRoleInd] = React.useState(0);
  const [driveLicense, setDriveLicense] = React.useState("");
  const [pasportImage, setPassportImage] = React.useState("");
  const [token] = useToken();

  const route = useRouter();

  const gendersOptions = [
    t("male"),
    t("female"),
  ];

  const roles = [
    t("driver"),
    t("student"),
  ];

  const submitHandler = () => {
    if (phoneNum === "") { Alert.alert(t("invalidData"), t("checkPhoneNumber")); return; } else
    if (name === "") { Alert.alert(t("invalidData"), t("checkName")); return; } else
    if (surname === "") { Alert.alert(t("invalidData"), t("checkSurname")); return; } else
    if (birthDay === "") { Alert.alert(t("invalidData"), t("checkBirthDay")); return; } else
    if (residence === "") { Alert.alert(t("invalidData"), t("checkResidence")); return; } else
    if (driveLicense === "") { Alert.alert(t("invalidData"), t("checkDriveLicense")); return; } else
    if (pasportImage === "") { Alert.alert(t("invalidData"), t("checkPassportImage")); return; }

    API.userUpdatePersonalInfo(
      token,
      phoneNum,
      name,
      surname,
      birthDay,
      residence,
      gendersOptions[genderInd],
      roles[roleInd],
      driveLicense,
      pasportImage,
    )
    .then(d => {
      if (d?.message) {
        Alert.alert(t("info"), t("dataSaved"));
        route.back();
      }
    })
    .catch((e) => {
      Alert.alert(t("error"), t("somethingWentWrong"));
    });
  };

  return (
    <ScrollView>

      <View style={styles.root}>
        <CustomInput
          title={t("phoneNumber")}
          value={phoneNum}
          setValue={setPhoneNum}
          placeholder={t("enterPhoneNumber")}
        />

        <CustomInput
          title={t("name")}
          value={name}
          setValue={setName}
          placeholder={t("enterYourName")}
        />

        <CustomInput
          title={t("surname")}
          value={surname}
          setValue={setSurname}
          placeholder={t("enterYourSurname")}
        />

        <CustomInput
          title={t("birthDay")}
          value={birthDay}
          setValue={setBirthDay}
          placeholder={t("enterBirthDay")}
        />

        <CustomInput
          title={t("residence")}
          value={residence}
          setValue={setResidence}
          placeholder={t("enterYourResidence")}
        />

        <CustomDropDownMenu
          title={t("gender")}
          valueIndex={genderInd}
          setValueIndex={setGenderInd}
          options={gendersOptions}
        />

        <CustomDropDownMenu
          title={t("role")}
          valueIndex={roleInd}
          setValueIndex={setRoleInd}
          options={roles}
        />

        <CustomFileInput
          title={t("driveLicense")}
          value={driveLicense}
          setValue={setDriveLicense}
        />
        {
          driveLicense &&
          <View style={styles.imagePreview}>
            <TouchableWithoutFeedback onPress={() => setDriveLicense("")}>
              <Text style={styles.closeButton} >x</Text>
            </TouchableWithoutFeedback>
            <Image source={{ uri: driveLicense }} width={100} height={100} borderRadius={10} />
          </View>
        }

        <CustomFileInput
          title={t("passportImage")}
          value={pasportImage}
          setValue={setPassportImage}
        />
        {
          pasportImage &&
          <View style={styles.imagePreview}>
            <TouchableWithoutFeedback onPress={() => setPassportImage("")}>
              <Text style={styles.closeButton} >x</Text>
            </TouchableWithoutFeedback>
            <Image source={{ uri: pasportImage }} width={100} height={100} borderRadius={10} />
          </View>
        }

        <Button title={t("save")} onPress={submitHandler} />
      </View>
    </ScrollView>
  )
}

export default PersonalData;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    gap: 15,
  },

  imagePreview: {
    position: "relative",
    width: 100,
  },

  closeButton: {
    position: "absolute",
    right: 0,
    backgroundColor: "red",
    zIndex: 100,
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
})
