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
          <Image 
            width={30}
            height={30}
            borderRadius={30}
            source={{uri: data.icon}}
          />
          <Text>{data.title}</Text>
        </View>
        <Image 
          width={18}
          height={18}
          source={{uri: "https://cdn-icons-png.flaticon.com/512/32/32213.png"}}
        />
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
    { icon: "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=", title: t("personalData"), link: "/profileScreens/personalData" },
    { icon: "https://icons.veryicon.com/png/o/miscellaneous/template-3/payment-method-1.png", title: t("paymentsMethods"), link: "/profileScreens/paymentsMethods" },
    { icon: "https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png", title: t("settings"), link: "/profileScreens/settings" },
    { icon: "https://static.vecteezy.com/system/resources/previews/003/694/243/non_2x/car-icon-in-flat-style-simple-traffic-icon-free-vector.jpg", title: t("myCars"), link: "/profileScreens/myCars" },
    { icon: "https://static.vecteezy.com/system/resources/thumbnails/026/960/552/small/shield-and-lock-icon-simple-flat-style-secure-safe-computer-protect-safety-web-privacy-concept-illustration-symbol-isolated-on-white-background-eps-10-vector.jpg", title: t("security"), link: "/profileScreens/security" },
    { icon: "https://www.shutterstock.com/image-vector/feedback-icon-logo-isolated-sign-260nw-2185716263.jpg", title: t("feedback"), link: "/profileScreens/feedback" },
    { icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-icons/logout-vptf0h04oyagpspzgfbr0o.png/logout-oi2tej5exikqge60p4sy1.png?_a=DAJFJtWIZAAC", title: t("logout"), link: "/profileScreens/logout" },
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
              <Skeleton width={100} height={100} radius="100%" indicatorColor={imageSrc ? "white" : null} /> :
              <Image
                width={100}
                height={100}
                borderRadius={100}
                style={{borderWidth: 1}}
                source={{ uri: imageSrc ? API.fileGetById(imageSrc) : "https://as2.ftcdn.net/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"}}
              />
          }
          <TouchableOpacity onPress={editImage} style={styles.avatarEdit}>
            <Image 
              width={30}
              height={30}
              source={{uri: "https://img.icons8.com/m_rounded/512/FAB005/plus.png"}}
              style={{borderRadius: 50, backgroundColor: "white"}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mainInfo}>
          <Text>{userData?.name || "(none)"} {userData?.surname }</Text>
          <View>
            <View style={styles.balance}>
              <Text>{t('balance')}</Text>
              <View style={styles.balanceSpan}>
                <Text>0 AMD</Text>
                <Image 
                  width={25}
                  height={25}
                  borderRadius={25}
                  source={{uri: "https://img.icons8.com/m_rounded/512/FAB005/plus.png"}}
                />
              </View>
            </View>

            <View style={styles.rating}>
              <Text>5.00</Text>
              <Image 
                width={15}
                height={15}
                source={{uri: "https://static-00.iconduck.com/assets.00/rating-icon-512x488-f3wudmx0.png"}}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.lineBox}>
        <View style={styles.line}></View>
      </View>

      <View style={styles.statistics}>
        <Statistic value={userData?.phoneNumber || "(none)"} title={t("phoneNumber")} />
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
