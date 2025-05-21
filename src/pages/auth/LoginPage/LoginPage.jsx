// libs
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// components
import CustomInput from '../../../components/custom/CustomInput';

// utils
import ROUTES from '../../../utils/routes';
import API from '../../../utils/API';

// custom hooks
import useToken from '../../../customHooks/useToken';
import useUserId from '../../../customHooks/useUserId';
import useRole from '../../../customHooks/useRole';

// styles
import classes from './styles.module.css';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [, saveToken] = useToken();
  const [, saveUserId] = useUserId();
  const [, saveRole] = useRole();
  const navigate = useNavigate();

  const loginHandler = () => {
    if (login !== "" && pass !== "") {
      API.authLogin(login, pass)
        .then(async (d) => {
          if (d?.data && d.data?.token && d.data?.id) {
            await saveUserId(d.data.id);
            await saveToken(d.data.token);
            API.userGetById(d.data.token, d.data.id)
            .then(d => {
              if (d?.data?.role) {
                saveRole(d.data.role);
                navigate(ROUTES.TAB_ADD_RIDE);
              }
            });
          }
        })
        .catch(e => {
          setAuthErrorMessage(t('invalidInputs'));
        });
    } else {
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={classes.root}>
      <p className={classes.headerText}>{t('login')}</p>
      
      <CustomInput
        value={login}
        setValue={setLogin}
        placeholder={t('loginPlaceholder')}
      />

      <CustomInput
        value={pass}
        type='password'
        setValue={setPass}
        placeholder={t('passwordPlaceholder')}
      />

      {
        authErrorMessage &&
        <p className={classes.errorMessage}>{authErrorMessage}</p>
      }
      <button className={classes.button} onClick={loginHandler}>
        {t('loginButton')}
      </button>

      <div className={classes.footer}>
        <p>{t('dontHaveAccount')}</p>
        <Link to={ROUTES.AUTH_REGISTER} className={classes.link}>{t('register')}</Link>
      </div>

      {/* Language Selector */}
      <div className={classes.languageSelector}>
        <button onClick={() => changeLanguage('en')}>{t('english')}</button>
        <button onClick={() => changeLanguage('hy')}>{t('armenian')}</button>
        <button onClick={() => changeLanguage('ru')}>{t('russian')}</button>
      </div>
    </div>
  )
}

