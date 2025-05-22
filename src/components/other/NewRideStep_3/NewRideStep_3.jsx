// libs
import React from 'react';
import { useDispatch } from 'react-redux';

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';

// api
import API from '../../../utils/API';

// slice
import { setCar } from '../../../store/slices/newRideSlice';

// styles
import classes from './styles.module.css';

export default function NewRideStep_3({ setIsNextButtonDisabled }) {
  const [cars, setCars] = React.useState([]);
  const [selectedInd, setSelectedInd] = React.useState(-1);

  const dispatch = useDispatch();

  const [token] = useToken(); 
  const [userId] = useUserId();
  
  const carSelect = (ind) => {
    setIsNextButtonDisabled(false);
    setSelectedInd(ind);
    dispatch(setCar(ind));
  }

  React.useEffect(() => {
    if (!token || !userId) {
      return;
    }
    
    API.getCarsByUserId(token, userId)
    .then(d => {
      if (d?.data) {
        setCars(d.data);
      }
    })
  }, [token, userId]);

  return (
    <div className={classes.root}>
      {
        cars.map(item => 
          <button 
            key={item._id}
            onClick={() => carSelect(item._id)}
            className={classes.carCardButton}
          > 
            <CarCard 
              carData={item}
              isSelected={(item._id === selectedInd)}
            />
          </button>
        ) 
      }
    </div>
  )
}

const CarCardProperty = ({ name, value, children }) => {
  return (
    <div className={classes.property}>
      <p>{name}</p>
      <p>{value}</p>
      {children}
    </div>
  );
}

const CarCard = ({ carData, isSelected }) => {
  console.log(carData);
  
  return (
    <div className={`${classes.carCard} ${isSelected && classes.selectedCarCard}`}>
      <p className={classes.headerp}>{carData.make}</p>

      <CarCardProperty name='Model' value={carData.model} />
      <CarCardProperty name='Year' value={carData.year} />

      <div className={classes.carImages}>
        {
          carData.carImages.map((imageId) =>
            <img src={API.fileGetById(imageId)} alt="image" className={classes.carImage}/>
          )
        }
      </div>
    </div>
  );
}