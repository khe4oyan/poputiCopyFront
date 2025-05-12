// libs
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// components
import TrafficCard from '../../../components/other/TrafficCard';
import Header from '../../../components/other/Header';
import TabNavigation from '../../../components/other/TabNavigation';

// custom hooks
import useUserId from '../../../customHooks/useUserId';
import useToken from '../../../customHooks/useToken';

// utils
import API from '../../../utils/API';

// styles
import classes from './styles.module.css';

export default function TrafficsPage() {
  const [journeys, setJourneys] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [token] = useToken();
  const [userId] = useUserId();

  const {t} = useTranslation();

  useEffect(() => {
    if (!token) {
      return;
    }

    API.journeyGetAll(token)
      .then(d => {
        if (d?.data) {
          setJourneys(d.data);
        }
      });
  }, [token]);

  useEffect(() => {
    if (!token || !userId) {
      return;
    }

    API.userGetById(token, userId)
      .then(d => {
        if (d?.data?.role) {
          setUserRole(d.data.role);
        }
      })
  }, [token, userId]);

  const trafficCardDelete = (id) => {
    API.journeyDeleteById(token, id)
      .then(d => {
        if (d.message) {
          setJourneys(prev => prev.filter((item) => item._id !== id));
        }
      });
  };

  return (
    <div className={classes.root}>
      <Header title={t("myRides")} />
      {
        journeys.map((item) =>
          <TrafficCard
            key={item._id}
            data={item}
            userRole={userRole}
            onDelete={() => trafficCardDelete(item._id)}
          />
        )
      }

      <TabNavigation />
    </div>
  )
}