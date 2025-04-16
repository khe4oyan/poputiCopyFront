import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { setDate as setDateSlice } from '@/store/slices/newRideSlice';

const NewRideStep_2 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
  const dispatch = useDispatch();

  const onChange = (_: any, selectedDate: any) => {
    dispatch(setDateSlice(new Date(selectedDate).getTime()));
    setIsNextButtonDisabled(false);
  }

  return (
    <DateTimePicker
      textColor='black'
      accentColor='#ff4e00'
      themeVariant="light"
      testID="dateTimePicker"
      value={new Date()}
      mode="datetime"
      onChange={onChange}
    />
  )
}


export default NewRideStep_2

const styles = StyleSheet.create({})