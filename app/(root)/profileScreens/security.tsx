import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Security = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('securityTitle')}</Text>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({})
