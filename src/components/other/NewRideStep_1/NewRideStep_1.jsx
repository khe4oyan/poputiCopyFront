// libs
import React from 'react';
import { useDispatch } from 'react-redux'

import CustomDropDownMenu from '../../custom/CustomDropDownMenu';

import { setPlace } from '../../../store/slices/newRideSlice';
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

export default function NewRideStep_1({ setIsNextButtonDisabled }) {
  const [from, setFrom] = React.useState(0);
  const [to, setTo] = React.useState(1);

  const { t }= useTranslation();

  const dispatch = useDispatch();

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
    <div className={classes.root}>
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
    </div>
  )
}