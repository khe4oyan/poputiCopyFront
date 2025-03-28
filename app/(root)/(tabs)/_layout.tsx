import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

const TabIcon = ({ title }: any) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabs,
      }}
    >
      <Tabs.Screen name='notifications'
        options={{
          title: "Notifications",
          headerShown: true,
          tabBarIcon: () => (
            <TabIcon title="Notification"/>
          )
        }}
      />
      
      <Tabs.Screen name='messages'
        options={{
          title: "Messages",
          headerShown: true,
          tabBarIcon: () => (
            <TabIcon title="Messages"/>
          )
        }}
      />

      <Tabs.Screen name='add'
        options={{
          title: "Add new",
          headerShown: true,
          tabBarIcon: () => (
            <TabIcon title="Add"/>
          )
        }}
      />

      <Tabs.Screen name='traffics'
        options={{
          title: "My Traffics",
          headerShown: true,
          tabBarIcon: () => (
            <TabIcon title="My Traffics"/>
          )
        }}
      />

      <Tabs.Screen name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => (
            <TabIcon title="Profile"/>
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    backgroundColor: "white",
    borderTopColor: "red",
    borderTopWidth: 1,
    minHeight: 70,
  },

  view: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },

  text: {
    width: "100%",
    fontSize: 10.9,
  }
})