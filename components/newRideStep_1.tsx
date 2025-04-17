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

  const poputiWays = [
    t("poputiWays.metsamor"),
    t("poputiWays.erevan"),
  ];

  React.useEffect(() => {
    if (from !== to) {
      dispatch(setPlace({ from: poputiWays[from], to: poputiWays[to] }));
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [from, to]);

  return (
    <View style={styles.root}>
      <CustomDropDownMenu 
        title={t('from')}
        options={poputiWays}
        valueIndex={from}
        setValueIndex={setFrom}
      />

      <CustomDropDownMenu 
        title={t('to')}
        options={poputiWays}
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
