// components
import Header from '../../../components/other/Header';
import TabNavigation from '../../../components/other/TabNavigation';

// styles
import classes from './styles.module.css';

export default function NotificationsPage() {
  return (
    <div className={classes.root}>
      <Header title="Notifications"/>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>🚗 Your booked trip starts in 30 minutes.
Please be at the pickup location on time.</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>📍 The driver is on the way.
Track the vehicle live on the map.</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>🕒 The trip has been canceled by the driver.
You can choose another available ride.</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>💬 New message from your driver.
Open the chat to view the details.</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>✅ Seat successfully reserved.
You will receive a reminder before the trip.</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>⚠️ No drivers found for your selected time.
Try adjusting the time or check back later.</p>
      </div>

      <TabNavigation />
    </div>
  )
}