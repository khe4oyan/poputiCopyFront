import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Text>{t('notifications')}</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});
