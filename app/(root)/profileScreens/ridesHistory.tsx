import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';

const image = require("@/assets/images/icon.png");

const RidesHistory = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.headerText}>{t('noRides')}</Text>
      <Image source={image} style={styles.icon} />
    </View>
  )
}

export default RidesHistory

const styles = StyleSheet.create({
  headerText: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 25,
  },

  icon: {
    width: 250,
    height: 250,
    margin: "auto",
    marginTop: 150,
  }
})