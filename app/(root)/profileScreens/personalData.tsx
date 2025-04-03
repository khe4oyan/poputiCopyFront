import { StyleSheet, Text, View, ScrollView, Button, Image, TouchableWithoutFeedback } from 'react-native'
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
    "Female",
  ];

  const submitHandler = () => {
    // TODO: validate and send to backend
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

        {
          driveLicense &&
          <View style={styles.imagePreview}>
            <TouchableWithoutFeedback onPress={() => setDriveLicense("")}>
              <Text style={styles.closeButton} >x</Text>
            </TouchableWithoutFeedback>
            <Image source={{uri: driveLicense}} width={100} height={100} borderRadius={10}/>
          </View>
        }

        <Button title='Save' onPress={submitHandler}/> 
      </View>
    </ScrollView>
  )
}

export default PersonalData;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    gap:15,
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