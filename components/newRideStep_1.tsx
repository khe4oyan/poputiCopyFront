import { StyleSheet, View } from 'react-native'
import React from 'react'
import { setPlace } from '@/store/slices/newRideSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import CustomDropDownMenu from './custom/customDropDownMenu'

const NewRideStep_1 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
  const [from, setFrom] = React.useState(0);
  const [to, setTo] = React.useState(1);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const puputiWays = [
    "Մեծամոր",
    "Երևան",
  ];

  React.useEffect(() => {
    if (from !== to) {
      dispatch(setPlace({ from: puputiWays[from], to: puputiWays[to] }));
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [from, to]);

  return (
    <View style={styles.root}>
      <CustomDropDownMenu 
        title={t('from')}
        options={puputiWays}
        valueIndex={from}
        setValueIndex={setFrom}
      />

      <CustomDropDownMenu 
        title={t('to')}
        options={puputiWays}
        valueIndex={to}
        setValueIndex={setTo}
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
