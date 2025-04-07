import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomInput from './custom/customInput'
import { setPlace } from '@/store/slices/newRideSlice'
import { useDispatch } from 'react-redux'

const NewRideStep_1 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (from !== "" && to !== "") {
      dispatch(setPlace({ from, to }));
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [from, to]);

  return (
    <View style={styles.root}>
      <CustomInput
        value={from}
        setValue={setFrom}
        placeholder='enter where you are'
        title="From"
      />

      <CustomInput
        value={to}
        setValue={setTo}
        placeholder='enter where you want to go'
        title="To"
      />
    </View>
  )
}

export default NewRideStep_1

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    gap: 15,
  }
})