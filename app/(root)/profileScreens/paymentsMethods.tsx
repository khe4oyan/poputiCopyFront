import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Skeleton from '@/components/skeleton'
import { useTranslation } from 'react-i18next';

const PaymentMethod = ({ title }: { title: string }) => {
  return (
    <View style={styles.payMethod}>
      <View style={styles.content}>
        <Skeleton color='white' />
        <Text style={styles.contentText}>{title}</Text>
      </View>
      <Skeleton width={12} height={30} />
    </View>
  );
}

const PaymentsMethods = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Text style={styles.headerText}>{t('selectPaymentMethod')}</Text>

      <PaymentMethod title={t('creditCard')} />
      <PaymentMethod title={t('telcellWallet')} />
    </View>
  )
}

export default PaymentsMethods

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flex: 1,
  },

  headerText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 30,
  },

  payMethod: {
    backgroundColor: "#E1E1E1",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  content: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  contentText: {
    fontSize: 20
  },
})
