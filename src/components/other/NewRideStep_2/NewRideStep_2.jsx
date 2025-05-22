// libs
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// slice
import { setDate as setDateSlice } from '../../../store/slices/newRideSlice';

// styles
import classes from './styles.module.css';

export default function NewRideStep_2({ setIsNextButtonDisabled }) {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const onChange = (e) => {
    const selectedDate = e.target.value;
    dispatch(setDateSlice(new Date(selectedDate).getTime()));
    setDate(selectedDate);
    setIsNextButtonDisabled(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <input
          type="datetime-local"
          value={date}
          className={classes.input}
          onChange={onChange}
        />
      </div>
    </div>
  )
}