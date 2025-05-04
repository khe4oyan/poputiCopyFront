import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { setDate as setDateSlice } from '@/store/slices/newRideSlice';

const NewRideStep_2 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const onChange = (_: any, selectedDate: any) => {
    dispatch(setDateSlice(new Date(selectedDate).getTime()));
    setDate(selectedDate);
    setIsNextButtonDisabled(false);
  }

  return (
    <DateTimePicker
      textColor='black'
      accentColor='#1C2A82'
      themeVariant="light"
      testID="dateTimePicker"
      value={date}
      mode="datetime"
      onChange={onChange}
    />
  )
}


export default NewRideStep_2

const styles = StyleSheet.create({})