import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Skeleton from '@/components/skeleton';

const statisticsData = [
  { icon: null, title: "+37499001122", },
  { icon: null, title: 0, },
  { icon: null, title: 0, },
];

const sectionsData = [
  { icon: null, title: "Personal data" },
  { icon: null, title: "Payments" },
  { icon: null, title: "Rides history" },
  { icon: null, title: "Settings" },
  { icon: null, title: "My cars" },
  { icon: null, title: "Security" },
  { icon: null, title: "Feedback" },
  { icon: null, title: "Logout" },
];

type sectionData = {
  icon: any,
  title: string,
};

type statisticData = {
  icon: any,
  title: string | number,
};

const Statistic = ({ data }: { data: statisticData }) => {
  return (
    <View style={styles.statistic}>
      <Skeleton width={25} height={25} />
      <Text>{data.title}</Text>
    </View>
  );
};

const Section = ({ data }: { data: sectionData }) => {
  // TODO: modificate Text to Link for go other screen
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.leftBox}>
        <Skeleton radius="100%" width={30} height={30} /> 
        <Text>{data.title}</Text>
      </View>
      <Skeleton radius="0" width={8} height={18} />
    </View>
  );
}

const Profile = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.mainInfoContainer}>
        <View style={styles.avatarContainer} >
          <Skeleton width={100} height={100} radius="100%" />
          <Skeleton width={25} height={25} radius="100%" color="gray" style={styles.avatarEdit} />
        </View>

        <View style={styles.mainInfo}>
          <Text>Name Surname</Text>
          <View>
            <View style={styles.balance}>
              <Text>Balance</Text>
              <View style={styles.balanceSpan}>
                <Text>2010 AMD</Text>
                <Skeleton width={25} height={25} radius="100%" color="orange" />
              </View>
            </View>

            <View style={styles.rating}>
              <Text>0.00</Text>
              <Skeleton width={15} height={15} color="orange" />
              <Skeleton width={15} height={15} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.lineBox}>
        <View style={styles.line}></View>
      </View>

      <View style={styles.statistics} >
        {statisticsData.map((statisticData, i) =>
          <Statistic
            key={i}
            data={statisticData}
          />
        )}
      </View>

      <ScrollView style={styles.sections}>
        {
          sectionsData.map((sectionsData, i) =>
            <Section
              key={i}
              data={sectionsData}
            />
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    height: "100%",
  },

  avatarContainer: {
    position: "relative",
  },

  avatarEdit: {
    position: "absolute",
    top: '70%',
    right: 0,
  },

  mainInfoContainer: {
    padding: 10,
    flexDirection: "row",
    gap: 15,
  },

  mainInfo: {
    justifyContent: "space-between",
    flex: 1,
  },

  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceSpan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  lineBox: {
    justifyContent: "center",
    alignItems: "center",
  },

  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#0002",
  },

  statistics: {
    padding: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: .1,
    shadowRadius: 10,
    flexDirection: "row",
  },

  statistic: {
    flex: 1,
    backgroundColor: "",
    alignItems: "center",
    gap: 3,
  },

  sections: {
    padding: 10,
  },

  sectionContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#0003",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },

  leftBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
})