import '../../../i18n.js';

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TabIcon = ({ title, focused, icon }: any) => {
  return (
    <View style={styles.view}>
      {
        icon &&
        <Image 
          style={styles.viewImage}
          source={{uri: icon}}
        />
      }
      <Text style={[styles.text, focused && styles.focusedText]}>{title}</Text>
    </View>
  );
};

const TabsLayout = () => {
  const { t, ready } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (ready) {
      setIsReady(true);
    }
  }, [ready]);

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabs,
        }}
      >
        <Tabs.Screen name='notifications'
          options={{
            headerTintColor: "#1C2A82",
            title: "Notifications",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('notifications')} focused={focused} icon={"https://cdn-icons-png.flaticon.com/512/3119/3119338.png"} />
            )
          }}
        />

        <Tabs.Screen name='messages'
          options={{
            headerTintColor: "#1C2A82",
            title: "Chat",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('chat')} focused={focused} icon={"https://static.thenounproject.com/png/27709-200.png"}/>
            )
          }}
        />

        <Tabs.Screen name='index'
          options={{
            headerTintColor: "#1C2A82",
            title: "New Ride",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('newRide')} focused={focused} icon="https://cdn4.iconfinder.com/data/icons/maps-and-location-4/16/16_pin-map-location-navigation-plus-512.png"/>
            )
          }}
        />

        <Tabs.Screen name='traffics'
          options={{
            headerTintColor: "#1C2A82",
            title: "My Rides",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('myRides')} focused={focused} icon={"https://upload.wikimedia.org/wikipedia/commons/8/87/Arrow_top.png"} />
            )
          }}
        />

        <Tabs.Screen name='profile'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('profile')} focused={focused} icon={"https://www.shareicon.net/data/512x512/2015/10/04/111640_personal_512x512.png"}/>
            )
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabs: {
    position: 'absolute',
    backgroundColor: 'white',
    minHeight: 70,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  viewImage: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  text: {
    width: 80,
    textAlign: 'center',
    fontSize: 10.9,
  },
  focusedText: {
    color: '#1C2A82',
  },
  newRideImg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
  }
});

export default TabsLayout;
