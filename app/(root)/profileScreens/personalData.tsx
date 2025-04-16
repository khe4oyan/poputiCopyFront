import { StyleSheet, Text, View, ScrollView, Button, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import CustomInput from '@/components/custom/customInput'
import CustomFileInput from '@/components/custom/customFileInput'
import CustomDropDownMenu from '@/components/custom/customDropDownMenu'
import { useRouter } from 'expo-router'

import React from 'react'
import API from '@/utils/API'
import useToken from '@/customHooks/useToken'

const PersonalData = () => {
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
    "Male",
    "Female",
  ];

  const roles = [
    "driver",
    "student",
  ];

  const submitHandler = () => {
    if (phoneNum === "") { Alert.alert("Invalid data", "Check phone number and try again"); return; } else
    if (name === "") { Alert.alert("Invalid data", "Check name and try again"); return; } else
    if (surname === "") { Alert.alert("Invalid data", "Check surname and try again"); return; } else
    if (birthDay === "") { Alert.alert("Invalid data", "Check birth day and try again"); return; } else
    if (residence === "") { Alert.alert("Invalid data", "Check residence and try again"); return; } else
    if (driveLicense === "") { Alert.alert("Invalid data", "Check drive license and try again"); return; } else
    if (pasportImage === "") { Alert.alert("Invalid data", "Check passport image and try again"); return; }

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
        Alert.alert("Info", "Data saved");
        route.back();
      }
    })
    .catch((e) => {
      Alert.alert("Error", "Something went wrong");
    });
  };

  return (
    <ScrollView>

      <View style={styles.root}>
        <CustomInput
          title="Phone number"
          value={phoneNum}
          setValue={setPhoneNum}
          placeholder='enter phone number'
        />

        <CustomInput
          title="Name"
          value={name}
          setValue={setName}
          placeholder='enter your name'
        />

        <CustomInput
          title="Surname"
          value={surname}
          setValue={setSurname}
          placeholder='enter your surname'
        />

        <CustomInput
          title="Birth Day"
          value={birthDay}
          setValue={setBirthDay}
          placeholder='enter year.month.day, example: 2000.02.26'
        />

        <CustomInput
          title="Residence"
          value={residence}
          setValue={setResidence}
          placeholder='enter your residence'
        />

        <CustomDropDownMenu
          title={"Gender"}
          valueIndex={genderInd}
          setValueIndex={setGenderInd}
          options={gendersOptions}
        />

        <CustomDropDownMenu
          title={"Role"}
          valueIndex={roleInd}
          setValueIndex={setRoleInd}
          options={roles}
        />

        <CustomFileInput
          title="Drive license"
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
          title="Passport Image"
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


        <Button title='Save' onPress={submitHandler} />
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