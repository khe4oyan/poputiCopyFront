import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Skeleton from '@/components/skeleton';

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
  return (
    <View style={styles.root}>
      <Setting data={{ icon: null, title: "Bank data" }} />
      <Setting data={{ icon: null, title: "Language" }} />
      <Setting data={{ icon: null, title: "Delete account" }} />
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