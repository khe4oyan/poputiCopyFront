import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import TrafficCard from '@/components/trafficCard'

const Traffics = () => {
  const trafficCardDelete = (ind: number = 0) => {
    // TODO: delete traffic data
  };

  // TODO: get all journey

  return (
    <ScrollView style={styles.root}>
      {/* <TrafficCard onDelete={() => trafficCardDelete(ind)} /> */}
    </ScrollView>
  )
}

export default Traffics

const styles = StyleSheet.create({
  root: {
    padding: 10,
    marginBottom: 80,
  }
})