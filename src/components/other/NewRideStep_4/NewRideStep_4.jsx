// libs
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// slice 
import { setPrice as setPriceSlice } from '../../../store/slices/newRideSlice';

// custom 
import CustomInput from '../../custom/CustomInput';

// styles
// import classes from './styles.module.css';

export default function NewRideStep_4({ setIsNextButtonDisabled }) {
  const [price, setPrice] = React.useState("");

  const { t } = useTranslation();

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
      title={t('price')}
      placeholder={t("enter_price")}
      value={price}
      setValue={setPrice}
      type='number'
    />
  )
}