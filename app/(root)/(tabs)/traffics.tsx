import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrafficCard from '@/components/trafficCard'

const Traffics = () => {
  return (
    <View style={styles.root}>
      <TrafficCard />
      <TrafficCard />
      <TrafficCard />
      <TrafficCard />
      <TrafficCard />
    </View>
  )
}

export default Traffics

const styles = StyleSheet.create({
  root: {
    padding: 10,
  }
})