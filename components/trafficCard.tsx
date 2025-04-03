import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TrafficCard = () => {
  return (
    <View style={styles.root}>
      
    </View>
  )
}

export default TrafficCard

const styles = StyleSheet.create({
  root: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: .1,
    marginBottom: 15,
  },
})