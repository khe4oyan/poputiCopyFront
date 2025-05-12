// libs
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// styles
import classes from './styles.module.css';

export default function Header({ title, isShowBackButton = false }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.root}>
        <p className={classes.title}>{title}</p>
      </div>
      <div className={classes.headerBottom}></div>
    </>
  )
}