import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import TrafficCard from '@/components/trafficCard'

const Traffics = () => {
  const trafficCardDelete = (ind: number = 0) => {
    // TODO: delete traffic data
  };

  return (
    <ScrollView style={styles.root}>
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
      <TrafficCard onDelete={() => trafficCardDelete()} />
    </ScrollView>
  )
}

export default Traffics

const styles = StyleSheet.create({
  root: {
    padding: 10,
    paddingBottom: 70,
  }
})