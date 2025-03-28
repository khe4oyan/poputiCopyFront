import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Skeleton from '@/components/skeleton';


const statisticsData = [
  {
    icon: null,
    title: "+37499001122",
  },
  {
    icon: null,
    title: 0,
  },
  {
    icon: null,
    title: 0,
  },
];

const Statistic = ({ data }: any) => {
  return (
    <View>
      {/* icon */}
      <Skeleton width={25} height={25}/>
      <Text>{data.title}</Text>
    </View>
  );
}

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <View>
          {/* profile image */}
          <Skeleton width={100} height={100} radius="100%" />
          {/* edit image icon */}
          <Skeleton width={25} height={25} radius="100%" color="red" />
        </View>
        <View>
          <Text>Name Surname</Text>
          <View>
            <View>
              <Text>Balance</Text>
              <View>
                <Text>2010 AMD</Text>
                {/* add balance button */}
                <Skeleton width={25} height={25} radius="100%" color="orange" />
              </View>
            </View>
            <View>
              <Text>0.00</Text>
              <Skeleton width={50}/>
            </View>
          </View>
        </View>

        <View>
          {statisticsData.map((statisticData, i) =>
            <Statistic
              key={i}
              data={statisticData}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})