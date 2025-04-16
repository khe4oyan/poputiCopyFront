import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomInput from './custom/customInput'
import { setPlace } from '@/store/slices/newRideSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

const NewRideStep_1 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        placeholder={t('enterWhereYouAre')}
        title={t('from')}
      />

      <CustomInput
        value={to}
        setValue={setTo}
        placeholder={t('enterWhereYouWantToGo')}
        title={t('to')}
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
