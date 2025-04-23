import { Alert, Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomInput from '@/components/custom/customInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import API from '@/utils/API';
import CustomDropDownMenu from '@/components/custom/customDropDownMenu';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t, i18n } = useTranslation(); // Use the i18n object for language change
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [role, setRole] = React.useState(0);

  const router = useRouter();

  const roles = [
    "driver",
    "student"
  ];

  const registerHandler = () => {
    if (email !== "" && pass !== "") {
      API.authRegister(email, pass, roles[role])
        .then(d => {
          if (d?.data) {
            router.replace("/auth/login");
            Alert.alert(t('success'), t('registrationSuccess'));
          } else {
            Alert.alert(t('error'), t('invalidServerResponse'));
          }
        })
        .catch((e) => {
          Alert.alert(t('error'), `${email} ${t('alreadyRegistered')}`);
        });
    } else {
      Alert.alert(t('error'), t('invalidInputs'));
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.headerText}>{t('registration')}</Text>
      <CustomInput
        value={email}
        setValue={setEmail}
        placeholder={t('mail')}
      />
      <CustomInput
        value={pass}
        setValue={setPass}
        placeholder={t('password')}
      />

      <CustomDropDownMenu
        options={roles}
        setValueIndex={setRole}
        valueIndex={role}
        title={t('role')}
      />

      <TouchableWithoutFeedback onPress={registerHandler}>
        <Text style={styles.button}>{t('register')}</Text>
      </TouchableWithoutFeedback>

      <View style={styles.footer}>
        <Text>{t('alreadyHaveAccount')}</Text>
        <Link href="/(root)/auth/login" style={styles.link}>{t('login')}</Link>
      </View>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <Button title={t('english')} onPress={() => i18n.changeLanguage('en')} />
        <Button title={t('armenian')} onPress={() => i18n.changeLanguage('hy')} />
        <Button title={t('russian')} onPress={() => i18n.changeLanguage('ru')} />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    gap: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 40,
    marginBottom: 50,
    marginTop: 120,
  },
  button: {
    backgroundColor: "#ff4e00",
    color: "white",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
  },
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  link: {
    color: "#ff4e00",
  },
  languageSelector: {
    marginTop: 180,
    alignItems: 'flex-end',
  }
});
