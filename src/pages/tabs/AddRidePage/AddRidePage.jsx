// libs
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// components
import NewRideStep_1 from '../../../components/other/NewRideStep_1';
import NewRideStep_2 from '../../../components/other/NewRideStep_2';
import NewRideStep_3 from '../../../components/other/NewRideStep_3';
import NewRideStep_4 from '../../../components/other/NewRideStep_4';
import Header from '../../../components/other/Header';
import TabNavigation from "../../../components/other/TabNavigation";

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';

// api
import API from '../../../utils/API';

// slice
import { clearRide } from '../../../store/slices/newRideSlice';

// styles
import classes from './styles.module.css';

export default function AddRidePage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const dispatch = useDispatch();
  const newRideData = useSelector((s) => s.newRideSlice);
  const [token, _, __, navigateToAuth] = useToken();
  const [userId] = useUserId();

  useEffect(() => {
    let timer = null;

    if (token === '') {
      timer = setTimeout(() => {
        navigateToAuth();
      }, 100);
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [token]);

  useEffect(() => {
    if (userId === "") {
      return;
    }

    API.userGetById(token, userId)
      .then(d => {
        if (d?.data?.role) {
          setUserRole(d.data.role);
        }
      })
  }, [userId]);

  if (userRole !== 'driver') {
    return (
      <div className={classes.root}>
        <p>Change your role before add new rides</p>
      </div>
    );
  }

  const sections = [
    t('selectPlace'),
    t('selectDateTime'),
    t('chooseCar'),
    t('setPrice'),
  ];

  const nextStep = () => {
    const sectionsCount = sections.length - 1;
    if (step < sectionsCount) {
      setStep(prev => prev + 1);
    } else {
      API.journeyCreate(token, newRideData)
      .then(d => {
        alert(t('success'), t('newRideAdded'));
        dispatch(clearRide());
        setStep(0);
      })
      .catch((e) => {
        alert("Fail", "Undefined error");
      });
    }

    setIsNextButtonDisabled(true);
  };

  return (
    <div className={classes.root}>
      <Header title={t("newRide")} />

      <p className={classes.title}>{sections[step]}</p>

      <div className={classes.progress}>
        {sections.map((_, ind) => (
          <div key={ind} className={`${classes.section} ${((ind <= step) && classes.activeSection)}`}></div>
        ))}
      </div>

      {step === 0 && <NewRideStep_1 setIsNextButtonDisabled={setIsNextButtonDisabled} />}
      {step === 1 && <NewRideStep_2 setIsNextButtonDisabled={setIsNextButtonDisabled} />}
      {step === 2 && <NewRideStep_3 setIsNextButtonDisabled={setIsNextButtonDisabled} />}
      {step === 3 && <NewRideStep_4 setIsNextButtonDisabled={setIsNextButtonDisabled} />}

      <button
        className={`${classes.nextButton} ${isNextButtonDisabled && classes.nextButtonDisabled}`}
        disabled={isNextButtonDisabled}
        onClick={nextStep}
      >
        {step < sections.length - 1 ? t('next') : t('save')}
      </button>

      <TabNavigation />
    </div>
  )
}