import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import TrafficCard from '@/components/trafficCard'
import { useFocusEffect } from 'expo-router';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';
import useUserId from '@/customHooks/useUserId';

const Traffics = () => {
  const [journeys, setJourneys] = useState([]);
  const [token] = useToken();
  const [userRole, setUserRole] = useState(null);
  const [userId] = useUserId();

  useFocusEffect(useCallback(() => {
    if (!token) {
      return;
    }
    
    API.journeyGetAll(token)
      .then(d => {
        if (d?.data) {
          setJourneys(d.data);
        }
      });
  }, [token]));

  useFocusEffect(useCallback(() => {
    API.userGetById(token, userId)
      .then(d => {
        if (d?.data?.role) {
          setUserRole(d.data.role);
        }
      })
  }, [token, userId]));

  const trafficCardDelete = (id: any) => {
    API.journeyDeleteById(token, id)
      .then(d => {
        if (d.message) {
          setJourneys(prev => prev.filter((item: any) => item._id !== id));
        }
      });
  };

  return (
    <ScrollView style={styles.root}>
      {
        journeys.map((item: any) =>
          <TrafficCard
            key={item._id}
            data={item}
            userRole={userRole}
            onDelete={() => trafficCardDelete(item._id)}
          />
        )
      }
    </ScrollView>
  )
}

export default Traffics

const styles = StyleSheet.create({
  root: {
    padding: 10,
    marginBottom: 80,
  }
})