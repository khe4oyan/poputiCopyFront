import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

const TabIcon = ({ title, focused }: any) => {
  return (
    <View style={styles.view}>
      <Text style={[styles.text, focused && styles.focusedText]}>{title}</Text>
    </View >
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
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Notification" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='messages'
        options={{
          title: "Chat",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Chat" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='add'
        options={{
          title: "Search",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Search" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='traffics'
        options={{
          title: "My Traffics",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="My Rides" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='profile'
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" focused={focused} />
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
    borderTopColor: "#FF4E00",
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
  },

  focusedText: {
    color: "#FF4E00",
  }
})