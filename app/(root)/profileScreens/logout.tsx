import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useToken from '@/customHooks/useToken'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const [, , deleteToken] = useToken();
  const route = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    deleteToken();
    route.replace("/(root)/(tabs)");
  }, []);

  return (
    <View>
      <Text>{t('logoutInProcess')}</Text>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})
