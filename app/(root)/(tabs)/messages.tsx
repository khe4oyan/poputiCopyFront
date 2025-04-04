import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Messages = () => {
  return (
    <View style={styles.root}>
      <Text>Messages</Text>
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  root: {
    padding: 10, 
  }
})