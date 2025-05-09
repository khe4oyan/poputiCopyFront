import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Skeleton from './skeleton'
import { useTranslation } from 'react-i18next';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';
import { useFocusEffect } from 'expo-router';
import useUserId from '@/customHooks/useUserId';

const TrafficCard = ({ data, onDelete, userRole }: any) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [token] = useToken();
  const [userId] = useUserId();
  const [driverData, setDriverData] = useState<any>(null);
  const [carData, setCardata] = useState<any>(null);
  const [isJoined, setIsJoined] = useState<any>(null);

  useFocusEffect(useCallback(() => {
    if (data?.passengers) {
      if (data.passengers.includes(userId)) {
        setIsJoined(true);
        return;
      }
    }
  }, [userId]));

  const deleteButtonHandler = () => {
    onDelete();
    setIsDeleting(true);
  }

  const onJoin = () => {
    setIsJoined(false);
    API.journeyJoinById(token, data._id)
      .then(d => {
        if (d.data) {
          setIsJoined(true);
        }
      })
      .catch(e => {
        setIsJoined(null);
        Alert.alert("Failed", "Cant join. Try again.");
      });
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

    const formatTwoNumber = (num: number) => {
      return num < 10 ? `0${num}` : num;
    }

    return `${year}.${formatTwoNumber(month)}.${formatTwoNumber(day)} | ${formatTwoNumber(hours)}:${formatTwoNumber(minutes)}`;
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

    API.carGetById(token, data.car)
      .then(d => {
        setCardata(d.data);
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
          <Text style={styles.opacityText}>Car Mark: {carData?.make}</Text>
          <Text style={styles.opacityText}>Car Model: {carData?.model}</Text>
          <Text style={styles.opacityText}>Car Year: {carData?.year}</Text>
        </View>
        <View style={styles.rightSection}>
          {
            driverData?.profilePhoto ?
              <Image
                source={{ uri: driverData?.profilePhoto ? API.fileGetById(driverData.profilePhoto) : "https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" }}
                width={50} height={50}
                borderRadius={50}
              /> :
              <Skeleton width={50} height={50} radius={50} indicatorColor={"white"} />
          }
          <Text style={styles.fullName}>{`${driverData?.name} ${driverData?.surname}`}</Text>
          <Text style={styles.price}>{data?.count} AMD</Text>
        </View>
      </View>
      {
        carData?.carImages && carData.carImages?.length > 0 &&
        <ScrollView style={{height: (carData.carImages.length > 3 ? 120 : 100), width: "100%", marginTop: 10}}>
          <View  style={styles.carImageContainer}>
            {
              carData.carImages.map((photo: any, i: number) =>
                <Image 
                  style={styles.carImage}
                  source={{uri: API.fileGetById(photo)}}
                  key={i}
                />
              )
            }
          </View >
        </ScrollView>
      }
      <View style={styles.footer}>
        {
          userRole === 'driver' ?
            <TouchableOpacity style={styles.deleteButton} onPress={deleteButtonHandler}>
              <Text style={styles.deleteButtonText}>{t('delete')}</Text>
            </TouchableOpacity> :

            <JoinButton
              onJoin={onJoin}
              isJoined={isJoined}
            />
        }

        <Text style={[styles.boldText, styles.statusText]}>{t('active')}</Text>
      </View>
    </View>
  )
}

function JoinButton({ onJoin, isJoined }: any) {
  if (isJoined === null) {
    return (
      <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    );
  }

  if (isJoined === false) {
    return (
      <View style={styles.joinButton}>
        <ActivityIndicator color="green" />
      </View>
    );
  }

  return (
    <View style={styles.joinedContainer}>
      <Text style={styles.joinButtonText}>Joined!</Text>
    </View>
  );
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
    color: "#A55CCF",
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

  joinButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: "green",
  },
  joinButtonText: {
    color: "green",
  },

  joinedContainer: {
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
  },

  statusText: {
    color: "#A55CCF",
    paddingRight: 20,
  },

  carImageContainer: {
    flexDirection: "row",
    gap: 5,
    width: '100%',
    flexWrap: "wrap",
  },

  carImage: {
    width: 100,
    height: 100,
    borderRadius: 3,
  }
})
