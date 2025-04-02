import { StyleSheet, Text, View } from 'react-native'
import CustomInput from '@/components/custom/customInput'
import CustomFileInput from '@/components/custom/customFileInput'
import CustomDropDownMenu from '@/components/custom/customDropDownMenu'

import React from 'react'

const PersonalData = () => {
  const [phoneNum, setPhoneNum] = React.useState('');
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthDay, setBirthDay] = React.useState("");
  const [residence, setResidence] = React.useState("");
  const [genderInd, setGenderInd] = React.useState(0);
  const [driveLicense, setDriveLicense] = React.useState("");

  const gendersOptions = [
    "Male",
    "Femalte",
  ];

  return (
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
        placeholder='enter your birth day'
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
      
      <CustomFileInput 
        title="Drive license"
        value={driveLicense}
        setValue={setDriveLicense}
      />
    </View>
  )
}

export default PersonalData

const styles = StyleSheet.create({
  root: {
    padding: 10,
    gap:15,
  }
})