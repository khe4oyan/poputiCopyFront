// libs
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// components
import CustomInput from '../../../components/custom/CustomInput';
import CustomFileInput from '../../../components/custom/CustomFileInput';
import CustomDropDownMenu from '../../../components/custom/CustomDropDownMenu';

// custom hooks
import useToken from '../../../customHooks/useToken';

// utils
import API from '../../../utils/API';

// styles
import classes from './styles.module.css';

export default function PersonalDataPage() {
  const { t } = useTranslation();

  const [phoneNum, setPhoneNum] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthDay, setBirthDay] = React.useState("");
  const [residence, setResidence] = React.useState("");
  const [genderInd, setGenderInd] = React.useState(0);
  const [driveLicense, setDriveLicense] = React.useState("");
  const [pasportImage, setPassportImage] = React.useState("");
  const [token] = useToken();
  
  const navigate = useNavigate();

  const gendersOptions = [
    t("male"),
    t("female"),
  ];

  const submitHandler = () => {
    if (phoneNum === "") { alert(t("invalidData"), t("checkPhoneNumber")); return; } else
    if (name === "") { alert(t("invalidData"), t("checkName")); return; } else
    if (surname === "") { alert(t("invalidData"), t("checkSurname")); return; } else
    if (birthDay === "") { alert(t("invalidData"), t("checkBirthDay")); return; } else
    if (residence === "") { alert(t("invalidData"), t("checkResidence")); return; } else
    if (driveLicense === "") { alert(t("invalidData"), t("checkDriveLicense")); return; } else
    if (pasportImage === "") { alert(t("invalidData"), t("checkPassportImage")); return; }

    API.userUpdatePersonalInfo(
      token,
      phoneNum,
      name,
      surname,
      birthDay,
      residence,
      gendersOptions[genderInd],
      driveLicense,
      pasportImage,
    )
      .then(d => {
        if (d?.message) {
          alert(`${t("info")}: ${t("dataSaved")}`);
          navigate(-1);
        }
      })
      .catch((e) => {
        alert(`${t("error")}: ${t("somethingWentWrong")}`);
      });
  };

  return (
    <div className={classes.root}>
      <CustomInput
        title={t("phoneNumber")}
        value={phoneNum}
        setValue={setPhoneNum}
        placeholder={t("enterPhoneNumber")}
      />

      <CustomInput
        title={t("name")}
        value={name}
        setValue={setName}
        placeholder={t("enterYourName")}
      />

      <CustomInput
        title={t("surname")}
        value={surname}
        setValue={setSurname}
        placeholder={t("enterYourSurname")}
      />

      <CustomInput
        title={t("birthDay")}
        value={birthDay}
        setValue={setBirthDay}
        placeholder={t("enterBirthDay")}
      />

      <CustomInput
        title={t("residence")}
        value={residence}
        setValue={setResidence}
        placeholder={t("enterYourResidence")}
      />

      <CustomDropDownMenu
        title={t("gender")}
        valueIndex={genderInd}
        setValueIndex={setGenderInd}
        options={gendersOptions}
      />

      <CustomFileInput
        title={t("driveLicense")}
        value={driveLicense}
        setValue={setDriveLicense}
      />

      {
        driveLicense &&
        <div className={classes.imagePreview}>
          <button className={classes.closeButton} onClick={() => setDriveLicense("")}>x</button>
          <img
            src={driveLicense}
            width={100}
            height={100}
            alt="driver_license"
          />
        </div>
      }

      <CustomFileInput
        title={t("passportImage")}
        value={pasportImage}
        setValue={setPassportImage}
      />

      {
        pasportImage &&
        <div className={classes.imagePreview}>
          <button className={classes.closeButton} onClick={() => setPassportImage("")}>x</button>
          <img
            src={pasportImage}
            width={100}
            height={100}
            alt="passport_license"
          />
        </div>
      }

      <button onClick={submitHandler}>{t("save")}</button>
    </div>
  )
}