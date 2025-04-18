import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Skeleton from './skeleton'
import { useTranslation } from 'react-i18next';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';
import { useFocusEffect } from 'expo-router';

const TrafficCard = ({ data, onDelete }: any) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [token] = useToken();
  const [driverData, setDriverData] = useState<any>(null);
  const [carData, setCardata] = useState<any>(null);

  const deleteButtonHandler = () => {
    onDelete();
    setIsDeleting(true);
  }

  const dateFormat = (date: any) => {
    const unformatDate = new Date(date);

    // date
    const year = unformatDate.getFullYear();
    const month = unformatDate.getMonth() + 1;
    const day = unformatDate.getDate();

    // time
    const hours = unformatDate.getHours();
    const minutes = unformatDate.getMinutes();

    return `${year}.${month}.${day} | ${hours}:${minutes}`;
  }

  useFocusEffect(useCallback(() => {
    if (!token) {
      return;
    }

    API.userGetById(token, data.driver)
    .then(d => {
      if (d?.data) {
        setDriverData(d.data);
      }
    });
  }, [token]));

  return (
    <View style={styles.root}>
      {
        isDeleting &&
        <View style={styles.deletingContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      }
      <View style={styles.infoContainer}>
        <View style={styles.leftSection}>
          <View>
            <Text style={styles.boldText}>{data.from}</Text>
            <Text style={styles.boldText}>{data.to}</Text>
          </View>
          <Text style={styles.opacityText}>{dateFormat(data.date)}</Text>
          <Text style={styles.opacityText}>(car)</Text>
        </View>
        <View style={styles.rightSection}>
          {
            driverData?.profilePhoto ?
            <Image 
              source={{uri: API.fileGetById(driverData.profilePhoto)}}
              width={50} height={50} 
              borderRadius={50}
            /> :
            <Skeleton width={50} height={50} radius={50} />
          }
          <Text style={styles.fullName}>{`${driverData?.name} ${driverData?.surname}`}</Text>
          <Text style={styles.price}>{data?.count} AMD</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteButtonHandler}>
          <Text style={styles.deleteButtonText}>{t('delete')}</Text>
        </TouchableOpacity>
        <Text style={[styles.boldText, styles.statusText]}>{t('active')}</Text>
      </View>
    </View>
  )
}

export default TrafficCard

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    position: 'relative',
    padding: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: .1,
    marginBottom: 15,
  },

  deletingContainer: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    top: 0,
    padding: 10,
    backgroundColor: "#fffe",
    width: "109%",
    height: "120%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  boldText: {
    fontWeight: 700,
  },
  opacityText: {
    color: "#646464",
  },

  infoContainer: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between",
  },

  leftSection: {
    maxWidth: 200,
  },

  rightSection: {
    alignItems: "center",
    gap: 10,
  },

  fullName: {
    fontWeight: 500,
  },

  price: {
    fontWeight: 500,
    color: "#ff4e00",
  },

  prohibitedContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "red",
  },
  deleteButtonText: {
    color: "red",
  },
  statusText: {
    color: "#ff4e00",
    paddingRight: 20,
  }
})
