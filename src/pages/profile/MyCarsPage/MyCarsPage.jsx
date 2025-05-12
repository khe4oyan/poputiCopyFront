// libs
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

// components
import CustomInput from '../../../components/custom/CustomInput';
import CustomFilesInput from '../../../components/custom/CustomFilesInput';

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';

// utils
import API from '../../../utils/API';

// styles
import classes from './styles.module.css';

export default function MyCarsPage() {
  const { t } = useTranslation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [cars, setCars] = useState([]);
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [carPhotos, setCarPhotos] = useState([]);

  const [token] = useToken();
  const [userId] = useUserId();

  const onNewCarHandler = () => {
    setIsShowModal(true);
  };

  const deleteOneById = (id) => {
    setCars((prev) => {
      return prev.filter((item) => item?._id !== id);
    });
  }

  const addButton = () => {
    API.carCreate(token, mark, model, year, carPhotos)
      .then(d => {
        if (d?.data) {
          setCars((prev) => {
            return [...prev, d.data]
          });
          setIsShowModal(false);
        } else {
          alert("FAILED: Cant create car. Try later");
        }
      });
  };

  useEffect(() => {
    if (!token || !userId) {
      return;
    }

    API.getCarsByUserId(token, userId)
      .then(d => {
        if (d?.data) {
          setCars(d.data);
        }
      });
  }, [token, userId]);

  return (
    <div className={classes.root}>
      <div className={classes.addCarContainer}>
        <img
          width={25}
          height={25}
          alt='plus_icon'
          src="https://img.icons8.com/m_rounded/512/FAB005/plus.png"
        />
        <button className={classes.addCarText} onClick={onNewCarHandler}>{t('addCar')}</button>
      </div>

      {
        isShowModal &&
        <div>
          <CustomInput
            placeholder='mark'
            value={mark}
            setValue={setMark}
          />
          <CustomInput
            placeholder='model'
            value={model}
            setValue={setModel}
          />
          <CustomInput
            placeholder='year'
            value={year}
            setValue={setYear}
          />

          <CustomFilesInput
            title="Car images"
            value={carPhotos}
            setValue={setCarPhotos}
          />

          <button onClick={addButton} className={classes.addButton}>Add</button>
        </div>
      }

      {
        cars.map(item =>
          <CarCard
            key={item?._id}
            carData={item}
            deleteOneById={deleteOneById}
          />
        )
      }
    </div>
  )
}

const CarCardProperty = ({ name, value, children }) => {
  return (
    <div className={classes.property}>
      <p>{name}</p>
      {
        value &&
        <p>{value}</p>
      }
      {children}
    </div>
  );
}

const CarCard = ({ carData, deleteOneById }) => {
  const { t } = useTranslation();
  const [token] = useToken();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteCar = () => {
    setIsDeleting(true);
    API.carDeleteById(token, carData?._id)
      .then(d => {
        if (d?.message === 'deleted') {
          deleteOneById(carData?._id);
        }
      });
  };

  return (
    <div className={classes.carCard}>
      {
        isDeleting &&
        <div className={classes.deletingContainer}>
          {/* <ActivityIndicator size={"large"} /> */}
          Deleting..
        </div>
      }

      <div className={classes.header}>
        <p className={classes.headerText}>{carData?.make}</p>
        <button onClick={onDeleteCar} className={classes.carCardDeleteButton}>delete</button>
      </div>

      <CarCardProperty name={t('model')} value={carData?.model} />
      <CarCardProperty name={t('year')} value={carData?.year} />

      {
        carData.carImages && carData.carImages.length > 0 &&
        <div style={{ height: (carData.carImages.length > 3 ? 120 : 100), width: "100%" }}>
          <div className={classes.carImageContainer}>
            {
              carData.carImages.map((photo, i) =>
                <img
                  className={classes.carImage}
                  src={API.fileGetById(photo)}
                  alt='car_images'
                  key={i}
                />
              )
            }
          </div>
        </div>
      }

    </div>
  );
}
