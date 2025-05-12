// libs
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

export default function SettingsPage() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={classes.root}>
      <Setting data={{ icon: null, title: 'Bank Data' }} />
      <Setting data={{ icon: null, title: 'Delete Account' }} />

      <div className={classes.languageSelector}>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hy')}>Հայերեն</button>
        <button onClick={() => changeLanguage('ru')}>Русский</button>
      </div>
    </div>
  );
}

const Setting = ({ data }) => {
  return (
    <div className={classes.statistic}>
      <div className={classes.header}>
        <div style={{ width: 25, height: 25, backgroundColor: '#A55CCF', borderRadius: 5 }}></div>
        <span>{data.title}</span>
      </div>
      <div style={{ width: 10, height: 25, backgroundColor: '#ccc', borderRadius: 5 }}></div>
    </div>
  );
};
