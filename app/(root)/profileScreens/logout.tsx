import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import useToken from '@/customHooks/useToken'
import { useRouter } from 'expo-router'

const Logout = () => {
  const [, , deleteToken] = useToken();
  const route = useRouter();
  
  useEffect(() => {
    deleteToken();
    route.replace("/(root)/(tabs)");
  });

  return (
    <View>
      <Text>In process...</Text>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})