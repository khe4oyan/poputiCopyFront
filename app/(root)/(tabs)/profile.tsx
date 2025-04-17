import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Skeleton from '@/components/skeleton';
import { Href, Link, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import useToken from '@/customHooks/useToken';
import API from '@/utils/API';
import useUserId from '@/customHooks/useUserId';

type sectionData = {
  icon: any;
  title: string;
  link: Href;
};

const Statistic = ({ title, value }: any) => {
  return (
    <View style={styles.statistic}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const Section = ({ data }: { data: sectionData }) => {
  return (
    <Link href={data.link}>
      <View style={styles.sectionContainer}>
        <View style={styles.leftBox}>
          <Skeleton radius="100%" width={30} height={30} />
          <Text>{data.title}</Text>
        </View>
        <Skeleton radius="0" width={8} height={18} />
      </View>
    </Link>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [token] = useToken();
  const [userId] = useUserId();

  useFocusEffect(
    useCallback(() => {
      if (!userId) {
        return;
      }

      API.userGetById(token, userId)
        .then(d => {
          if (d?.data) {
            const data = d.data;
            setUserData(data);
            setImageSrc(data.profilePhoto);
          }
        });
    }, [userId])
  );

  const sectionsData: Array<sectionData> = [
    { icon: null, title: t("personalData"), link: "/profileScreens/personalData" },
    { icon: null, title: t("paymentsMethods"), link: "/profileScreens/paymentsMethods" },
    { icon: null, title: t("settings"), link: "/profileScreens/settings" },
    { icon: null, title: t("myCars"), link: "/profileScreens/myCars" },
    { icon: null, title: t("security"), link: "/profileScreens/security" },
    { icon: null, title: t("feedback"), link: "/profileScreens/feedback" },
    { icon: null, title: t("logout"), link: "/profileScreens/logout" },
  ];

  const editImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      API.userUpdateProfilePhoto(token, result.assets[0].uri)
        .then(d => {
          if (d?.data) {
            setImageSrc(d.data);
          }
        })
        .catch(e => {
          console.log('############# ERROR ###');
          console.log(e);
          console.log('############# ###');
        });
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.mainInfoContainer}>
        <View style={styles.avatarContainer}>
          {
            imageSrc === null ?
              <Skeleton width={100} height={100} radius="100%" /> :
              <Image
                width={100}
                height={100}
                borderRadius={100}
                source={{ uri: API.fileGetById(imageSrc) }}
              />
          }
          <TouchableOpacity onPress={editImage} style={styles.avatarEdit}>
            <Skeleton width={25} height={25} radius="100%" color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.mainInfo}>
          <Text>{userData?.name} {userData?.surname}</Text>
          <View>
            <View style={styles.balance}>
              <Text>{t('balance')}</Text>
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

      <View style={styles.statistics}>
        <Statistic value={userData?.phoneNumber} title={t("phoneNumber")} />
      </View>

      <ScrollView style={styles.sections}>
        {sectionsData.map((sectionsData, i) =>
          <Section
            key={i}
            data={sectionsData}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
    flexDirection: 'row',
    backgroundColor: "",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  sections: {
    padding: 10,
  },

  sectionContainer: {
    width: "100%",
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
});
