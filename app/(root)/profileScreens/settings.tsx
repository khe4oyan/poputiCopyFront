import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Skeleton from '@/components/skeleton';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

type settingData = {
  icon: any,
  title: string | number,
};

const Setting = ({ data }: { data: settingData }) => {
  return (
    <View style={styles.statistic}>
      <View style={styles.header}>
        <Skeleton width={25} height={25} color='#ff4e00' />
        <Text>{data.title}</Text>
      </View>
      <Skeleton width={10} height={25} />
    </View>
  );
};

const Settings = () => {
  const { t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.root}>
      <Setting data={{ icon: null, title: t("bankData") }} />
      <Setting data={{ icon: null, title: t("deleteAccount") }} />

      <Button title="English" onPress={() => changeLanguage('en')} />
      <Button title="Հայերեն" onPress={() => changeLanguage('hy')} />
      <Button title="Русский" onPress={() => changeLanguage('ru')} />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    shadowColor: "black",
    gap: 10,
  },

  statistic: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
    padding: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
})
