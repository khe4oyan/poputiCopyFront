// _layout.tsx
import '../../../i18n.js'; // 👈 Սա շատ կարևոր է՝ միացնում ենք i18n ֆայլը

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TabIcon = ({ title, focused }: any) => {
  return (
    <View style={styles.view}>
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
            headerTintColor: "#ff4e00",
            title: "Notifications",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('notifications')} focused={focused} />
            )
          }}
        />

        <Tabs.Screen name='messages'
          options={{
            headerTintColor: "#ff4e00",
            title: "Chat",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('chat')} focused={focused} />
            )
          }}
        />

        <Tabs.Screen name='index'
          options={{
            headerTintColor: "#ff4e00",
            title: "New Ride",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('newRide')} focused={focused} />
            )
          }}
        />

        <Tabs.Screen name='traffics'
          options={{
            headerTintColor: "#ff4e00",
            title: "My Rides",
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('myRides')} focused={focused} />
            )
          }}
        />

        <Tabs.Screen name='profile'
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon title={t('profile')} focused={focused} />
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
  text: {
    width: 80,
    textAlign: 'center',
    fontSize: 10.9,
  },
  focusedText: {
    color: '#FF4E00',
  },
});

export default TabsLayout;
