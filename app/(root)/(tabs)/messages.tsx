import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomInput from '@/components/custom/customInput';

const Messages = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <View style={styles.root}>
      <CustomInput 
        placeholder='Message'
        value={message}
        setValue={setMessage}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
});
