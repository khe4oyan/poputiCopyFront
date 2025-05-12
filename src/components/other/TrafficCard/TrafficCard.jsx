// libs
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';

// api
import API from '../../../utils/API';

// styles
import classes from './styles.module.css';

export default function TrafficCard({ data, onDelete, userRole }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [carData, setCarData] = useState(null);
  const [isJoined, setIsJoined] = useState(null);
  const [token] = useToken();
  const [userId] = useUserId();

  const { t } = useTranslation();

  useEffect(() => {
    if (data?.passengers?.includes(userId)) {
      setIsJoined(true);
    }
  }, [data, userId]);

  useEffect(() => {
    if (!token) return;

    API.userGetById(token, data.driver)
      .then(res => res.data && setDriverData(res.data));

    API.carGetById(token, data.car)
      .then(res => res.data && setCarData(res.data));
  }, [token, data.driver, data.car]);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete();
  };

  const handleJoin = () => {
    if (isJoined === false) return;
    setIsJoined(false);

    API.journeyJoinById(token, data._id)
      .then(res => {
        if (res.data) setIsJoined(true);
      })
      .catch(() => {
        setIsJoined(null);
        alert("Can't join. Try again.");
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const pad = (n) => n < 10 ? `0${n}` : n;
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} | ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div className={classes.root}>
      {isDeleting && (
        <div className={classes.deletingContainer}>Loading...</div>
      )}

      <div className={classes.infoContainer}>
        <div className={classes.leftSection}>
          <div className={classes.boldText}>{data.from}</div>
          <div className={classes.boldText}>{data.to}</div>
          <div className={classes.opacityText}>{formatDate(data.date)}</div>
          <div className={classes.opacityText}>Car Mark: {carData?.make}</div>
          <div className={classes.opacityText}>Car Model: {carData?.model}</div>
          <div className={classes.opacityText}>Car Year: {carData?.year}</div>
        </div>

        <div className={classes.rightSection}>
          {driverData?.profilePhoto ? (
            <img
              src={API.fileGetById(driverData.profilePhoto)}
              alt="Driver"
              width={50}
              height={50}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#ccc' }} />
          )}
          <div className={classes.fullName}>
            {driverData?.name} {driverData?.surname}
          </div>
          <div className={classes.price}>{data.count} AMD</div>
        </div>
      </div>

      {carData?.carImages?.length > 0 && (
        <div className={classes.carImageContainer}>
          {carData.carImages.map((photo, i) => (
            <img
              key={i}
              src={API.fileGetById(photo)}
              alt={`car-${i}`}
              className={classes.carImage}
            />
          ))}
        </div>
      )}

      <div className={classes.footer}>
        {userRole === 'driver' ? (
          <button className={classes.deleteButton} onClick={handleDelete}>
            <span className={classes.deleteButtonText}>{t('delete')}</span>
          </button>
        ) : (
          <JoinButton onJoin={handleJoin} isJoined={isJoined} />
        )}
        <div className={classes.statusText}>{t('active')}</div>
      </div>
    </div>
  );
}

function JoinButton({ onJoin, isJoined }) {
  if (isJoined === null) {
    return (
      <button className={classes.joinButton} onClick={onJoin}>
        <span className={classes.joinButtonText}>Join</span>
      </button>
    );
  }

  if (isJoined === false) {
    return (
      <button className={classes.joinButton} disabled>
        <span className={classes.joinButtonText}>Joining...</span>
      </button>
    );
  }

  return (
    <div className={classes.joinedContainer}>Joined!</div>
  );
}
