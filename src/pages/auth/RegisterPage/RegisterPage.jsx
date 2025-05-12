// libs
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// components
import CustomInput from '../../../components/custom/CustomInput';
import CustomDropDownMenu from '../../../components/custom/CustomDropDownMenu';

// utils
import ROUTES from '../../../utils/routes';
import API from '../../../utils/API';

// styles
import classes from './styles.module.css';

export default function RegisterPage() {
  const { t, i18n } = useTranslation(); 
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [role, setRole] = React.useState(0);

  const navigate = useNavigate();

  const roles = [
    "driver",
    "student"
  ];

  const registerHandler = () => {
    if (email !== "" && pass !== "") {
      API.authRegister(email, pass, roles[role])
        .then(d => {
          if (d?.data) {
            navigate(ROUTES.AUTH_LOGIN);
          } else {
            alert(`${t('error')}:${t('invalidServerResponse')}`);
          }
        })
        .catch((e) => {
          alert(`${t('error')}: ${email} ${t('alreadyRegistered')}`);
        });
    } else {
      alert(`${t('error')}: ${t('invalidInputs')}`);
    }
  }

  return (
    <div className={classes.root}>
      <p className={classes.headerText}>{t('registration')}</p>

      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder={t('mail')}
      />

      <CustomInput
        value={pass}
        setValue={setPass}
        placeholder={t('password')}
        type='password'
      />

      <CustomDropDownMenu
        options={roles}
        setValueIndex={setRole}
        valueIndex={role}
        title={t('role')}
      />

      <button onClick={registerHandler} className={classes.button}>
        {t('register')}
      </button>

      <div className={classes.footer}>
        <p>{t('alreadyHaveAccount')}</p>
        <Link to={ROUTES.AUTH_LOGIN} className={classes.link}>{t('login')}</Link>
      </div>

      {/* Language Selector */}
      <div className={classes.languageSelector}>
        <button onClick={() => i18n.changeLanguage('en')}>{t('english')}</button>
        <button onClick={() => i18n.changeLanguage('hy')}>{t('armenian')}</button>
        <button onClick={() => i18n.changeLanguage('ru')}>{t('russian')}</button>
      </div>
    </div>
  )
}