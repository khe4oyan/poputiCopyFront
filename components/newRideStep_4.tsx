import { StyleSheet } from 'react-native'
import React from 'react'
import CustomInput from './custom/customInput'
import { useDispatch } from 'react-redux'
import { setPrice as setPriceSlice } from '@/store/slices/newRideSlice'

const NewRideStep_4 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any}) => {
  const [price, setPrice] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (price !== "") {
      dispatch(setPriceSlice(price));
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [price]);

  return (
    <CustomInput 
      title="Price"
      placeholder='enter price for this ride'
      value={price}
      setValue={setPrice}
      type='numeric'
    />
  )
}

export default NewRideStep_4;

const styles = StyleSheet.create({})