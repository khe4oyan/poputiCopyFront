import { StyleSheet, Text, View, Image } from 'react-native'
import { useTranslation } from 'react-i18next';

type socialIconPropsType = {
  title: string,
  icon?: any,
}

const SocialIcon = ({ title, icon }: socialIconPropsType) => {
  return (
    <View style={styles.socialIconContainer}>
      <Image 
          width={30}
          height={30}
          source={{uri: icon}}
        />
      <Text>{title}</Text>
    </View>
  );
}

const Feedback = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <View style={[styles.flexRow, styles.flexBetween, styles.section_1]}>
        <SocialIcon title={t('call')} icon={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvIH0qQEwp_XV51RMqRW30rtrLvU0EI9wTg&s"} />
        <SocialIcon title={t('gmail')} icon={"https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/48/google-gmail-512.png"} />
      </View>

      <View style={[styles.flexRow, styles.section_2]}>
        <Image 
          width={70}
          height={70}
          source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/960px-Facebook_logo_%28square%29.png"}}
        />
        <Image 
          width={70}
          height={70}
          borderRadius={15}
          source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"}}
        />
      </View>

      <View style={[styles.section_3]}>
        <Text style={styles.headerText}>{t('aboutUs')}</Text>
        <Text>
          {t('aboutUsText')}
        </Text>
      </View>
    </View>
  )
}

export default Feedback

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },

  flexRow: {
    flexDirection: "row",
    gap: 10,
  },

  flexBetween: {
    justifyContent: "space-around",
  },

  socialIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: .1,
    shadowRadius: 10,
  },

  section_1: {
    marginTop: 50,
  },

  section_2: {
    marginTop: 50,
    gap: 30,
    justifyContent: "center",
  },

  section_3: {
    marginTop: 50,
  },

  headerText: {
    textAlign: "center",
    fontSize: 20,
    color: "#A55CCF",
    marginBottom: 10,
  }
})
