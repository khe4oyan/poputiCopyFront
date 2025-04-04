import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import Skeleton from '@/components/skeleton';

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
          headerTintColor: "#ff4e00",
          title: "Notifications",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Notification" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='messages'
        options={{
          headerTintColor: "#ff4e00",
          title: "Chat",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Chat" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='index'
        options={{
          headerTintColor: "#ff4e00",
          title: "Search",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View>
              {/* <Skeleton
                color='#ff4e00'
                height={70}
                width={50}
                style={styles.searchIcon}
              /> */}
              <TabIcon title="Search" focused={focused} />
            </View>
          )
        }}
      />

      <Tabs.Screen name='traffics'
        options={{
          headerTintColor: "#ff4e00",
          title: "My Rides",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="My Rides" focused={focused} />
          )
        }}
      />

      <Tabs.Screen name='profile'
        options={{
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
  },

  searchIcon: {
    position: 'absolute',
    top: -65,
    left: -8,
  },
})