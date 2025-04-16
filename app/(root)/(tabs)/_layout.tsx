// _layout.tsx
import '../../../i18n.js'; // 👈 Սա շատ կարևոր է՝ միացնում ենք i18n ֆայլը

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
  const { t, i18n, ready } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (ready) {
      setIsReady(true);
    }
  }, [ready]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  if (!isReady) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.languageSelector}>
        <Button title="English" onPress={() => changeLanguage('en')} />
        <Button title="Հայերեն" onPress={() => changeLanguage('hy')} />
        <Button title="Русский" onPress={() => changeLanguage('ru')} />
      </View>

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.tabs,
        }}
      >
        <Tabs.Screen name="notifications" options={{ title: t('notifications') }} />
        <Tabs.Screen name="messages" options={{ title: t('chat') }} />
        <Tabs.Screen name="index" options={{ title: t('newRide') }} />
        <Tabs.Screen name="profile" options={{ title: t('profile') }} />
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
