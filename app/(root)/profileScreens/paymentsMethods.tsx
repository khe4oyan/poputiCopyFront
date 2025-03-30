import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Skeleton from '@/components/skeleton'

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
  return (
    <View style={styles.root}>
      <Text style={styles.headerText}>Select payment method</Text>

      <PaymentMethod title="Credit Card" />
      <PaymentMethod title="Telcell Wallet" />
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