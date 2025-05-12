// libs
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// components
import Header from '../../../components/other/Header';
import TabNavigation from '../../../components/other/TabNavigation';
import Skeleton from '../../../components/other/Skeleton';
import CustomFileInput from '../../../components/custom/CustomFileInput';

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';

// utils
import API from '../../../utils/API';
import ROUTES from '../../../utils/routes';

// styles
import classes from './styles.module.css';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [token] = useToken();
  const [userId] = useUserId();

  useEffect(() => {
    if (!userId) {
      return;
    }

    API.userGetById(token, userId)
      .then(d => {
        if (d?.data) {
          const data = d.data;
          setUserData(data);
          setImageSrc(data.profilePhoto);
        }
      });
  }, [userId]);

  const sectionsData = [
    { icon: "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=", title: t("personalData"), link: ROUTES.PROFILE_PERSONAL_DATA },
    { icon: "https://icons.veryicon.com/png/o/miscellaneous/template-3/payment-method-1.png", title: t("paymentsMethods"), link: ROUTES.PROFILE_PAYMENTS },
    { icon: "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png", title: t("settings"), link: ROUTES.PROFILE_SETTINGS },
    { icon: "https://static.vecteezy.com/system/resources/previews/003/694/243/non_2x/car-icon-in-flat-style-simple-traffic-icon-free-vector.jpg", title: t("myCars"), link: ROUTES.PROFILE_CARS },
    { icon: "https://www.shutterstock.com/image-vector/feedback-icon-logo-isolated-sign-260nw-2185716263.jpg", title: t("feedback"), link: ROUTES.PROFILE_FEEDBACK },
    { icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-icons/logout-vptf0h04oyagpspzgfbr0o.png/logout-oi2tej5exikqge60p4sy1.png?_a=DAJFJtWIZAAC", title: t("logout"), link: ROUTES.PROFILE_LOGOUT },
  ];

  const uploadImage = (img) => {
    API.userUpdateProfilePhoto(token, img)
      .then(d => {
        if (d?.data) {
          setImageSrc(d.data);
          setIsShowModal(false);
        }
      })
      .catch(e => {
        console.log('############# ERROR ###');
        console.log(e);
        console.log('############# ###');
      });
  }

  return (
    <div className={classes.root}>
      <Header title={t("profile")} />

      <div className={classes.root}>
        <div className={classes.mainInfoContainer}>
          <div className={classes.avatarContainer}>
            {
              imageSrc === null ?
                <Skeleton width={100} height={100} radius="100%" indicatorColor={imageSrc ? "white" : null} /> :
                <img
                  width={100}
                  height={100}
                  className={classes.avatar}
                  src={imageSrc ? API.fileGetById(imageSrc) : "https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"}
                />
            }
            <button onClick={() => { setIsShowModal(true) }} className={classes.avatarEdit}>
              <img
                width={30}
                height={30}
                src='https://img.icons8.com/m_rounded/512/FAB005/plus.png'
                style={{ borderRadius: "50px", backgroundColor: "white" }}
              />
            </button>
          </div>

          <div className={classes.mainInfo}>
            <p>{userData?.name || "(none)"} {userData?.surname}</p>
            <div>
              <div className={classes.balance}>
                <p>{t('balance')}</p>
                <div className={classes.balanceSpan}>
                  <p>0 AMD</p>
                  <img
                    width={25}
                    height={25}
                    src="https://img.icons8.com/m_rounded/512/FAB005/plus.png"
                  />
                </div>
              </div>

              <div className={classes.rating}>
                <p>5.00</p>
                <img
                  width={15}
                  height={15}
                  src='https://static-00.iconduck.com/assets.00/rating-icon-512x488-f3wudmx0.png'
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.lineBox}>
          <div className={classes.line}></div>
        </div>

        <div className={classes.statistics}>
          <Statistic value={userData?.phoneNumber || "(none)"} title={t("phoneNumber")} />
        </div>

        <div className={classes.sections}>
          {sectionsData.map((sectionsData, i) =>
            <Section
              key={i}
              data={sectionsData}
            />
          )}
        </div>
      </div>

      <TabNavigation />

      {
        isShowModal &&
        <div className={classes.modal}>
          <CustomFileInput
            value={imageSrc}
            setValue={uploadImage}
          />
        </div>
      }
    </div>
  )
}


const Statistic = ({ title, value }) => {
  return (
    <div className={classes.statistic}>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

const Section = ({ data }) => {
  return (
    <Link to={data.link}>
      <div className={classes.sectionContainer}>
        <div className={classes.leftBox}>
          <img
            width={30}
            height={30}
            src={data.icon}
          />
          <p>{data.title}</p>
        </div>
        <img
          width={18}
          height={18}
          src='https://cdn-icons-png.flaticon.com/512/32/32213.png'
        />
      </div>
    </Link>
  );
};