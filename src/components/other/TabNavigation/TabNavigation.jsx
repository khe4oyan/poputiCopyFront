// libs
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// custom hooks
import useRole from '../../../customHooks/useRole';

// utils
import ROUTES from '../../../utils/routes';

// styles
import classes from './styles.module.css';

export default function TabNavigation() {
  const { t } = useTranslation();
  const [role] = useRole();

  return (
    <>
      <div className={`${classes.root} ${role === "driver" ? classes.roleDriver : classes.roleStudent}`}>
        <TabIcon to={ ROUTES.TAB_NOTIFICATIONS } title={t('notifications')} icon={"https://cdn-icons-png.flaticon.com/512/3119/3119338.png"} />
        <TabIcon to={ ROUTES.TAB_MESSAGE } title={t('chat')} icon={"https://static.thenounproject.com/png/27709-200.png"} />
        {
          role === "driver" &&
          <TabIcon to={ ROUTES.TAB_ADD_RIDE } title={t('newRide')} icon="https://cdn4.iconfinder.com/data/icons/maps-and-location-4/16/16_pin-map-location-navigation-plus-512.png" />
        }
        <TabIcon to={ ROUTES.TAB_TRAFFICCS } title={t('myRides')} icon={"https://upload.wikimedia.org/wikipedia/commons/8/87/Arrow_top.png"} />
        <TabIcon to={ ROUTES.TAB_PROFILE } title={t('profile')} icon={"https://www.shareicon.net/data/512x512/2015/10/04/111640_personal_512x512.png"} />
      </div>

      <div className={classes.navigationTop}></div>
    </>
  )
}

const TabIcon = ({ to, title, icon }) => {
  return (
    <Link 
      to={to} 
      className={classes.navLink}
    >
      <div className={classes.view}>
        {
          icon &&
          <img
            className={classes.viewImage}
            src={icon}
          />
        }

        <p className={classes.text}>{title}</p>
      </div>
    </Link>
  );
};

