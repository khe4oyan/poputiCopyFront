// libs
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// utils
import ROUTES from '../../../utils/routes';

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';
import useRole from '../../../customHooks/useRole';

// styles
import classes from './styles.module.css';

export default function LogoutPage() {
  const { t } = useTranslation();
  const [, , deleteToken] = useToken();
  const [, , deleteUserId] = useUserId();
  const [, , deleteRole] = useRole();

  const navigate = useNavigate();

  useEffect(() => {
    deleteToken();
    deleteUserId();
    deleteRole();
    navigate(ROUTES.AUTH_LOGIN);
  }, []);

  return (
    <div className={classes.root}>
      <p>{t('logoutInProcess')}</p>
    </div>
  )
}