import { Alert, Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import CustomInput from '@/components/custom/customInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import useUserId from '@/customHooks/useUserId';

const Login = () => {
  const { t, i18n } = useTranslation();  // Use the i18n object for language change
  const [login, setLogin] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [, saveToken] = useToken();
  const [, saveUserId] = useUserId();
  const router = useRouter();

  const loginHandler = () => {
    if (login !== "" && pass !== "") {
      API.authLogin(login, pass)
        .then(async (d) => {
          if (d?.data && d.data?.token && d.data?.id) {
            await saveUserId(d.data.id);
            await saveToken(d.data.token)
            router.replace("/(root)/(tabs)");
          }
        });
    } else {
      Alert.alert(t('error'), t('invalidInputs'));
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);  // Switch language
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.headerText}>{t('login')}</Text>
      <CustomInput
        value={login}
        setValue={setLogin}
        placeholder={t('loginPlaceholder')}
      />
      <CustomInput
        value={pass}
        setValue={setPass}
        placeholder={t('passwordPlaceholder')}
      />

      <TouchableWithoutFeedback onPress={loginHandler}>
        <Text style={styles.button}>{t('loginButton')}</Text>
      </TouchableWithoutFeedback>

      <View style={styles.footer}>
        <Text>{t('dontHaveAccount')}</Text>
        <Link href="/(root)/auth/register" style={styles.link}>{t('register')}</Link>
      </View>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <Button title={t('english')} onPress={() => changeLanguage('en')} />
        <Button title={t('armenian')} onPress={() => changeLanguage('hy')} />
        <Button title={t('russian')} onPress={() => changeLanguage('ru')} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    gap: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 40,
    marginBottom: 50,
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
    marginTop: 20,
    gap: 10,
  }
});
