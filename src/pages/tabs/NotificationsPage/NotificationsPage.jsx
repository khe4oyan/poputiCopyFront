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
        <p className={classes.text}>Notification</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>Notification 2</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>Notification 3</p>
      </div>
      <div className={classes.notification}>
        <p className={classes.icon}>!</p>
        <p className={classes.text}>Notification 4</p>
      </div>

      <TabNavigation />
    </div>
  )
}