import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Text>{t('messages')}</Text>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});
