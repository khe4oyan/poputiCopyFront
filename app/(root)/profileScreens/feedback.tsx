import { StyleSheet, Text, View } from 'react-native'
import Skeleton from '@/components/skeleton'
import { useTranslation } from 'react-i18next';

type socialIconPropsType = {
  title: string,
  icon?: any,
}

const SocialIcon = ({ title, icon }: socialIconPropsType) => {
  return (
    <View style={styles.socialIconContainer}>
      <Skeleton color='#ff4e00' height={30} width={30} />
      <Text>{title}</Text>
    </View>
  );
}

const Feedback = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <View style={[styles.flexRow, styles.flexBetween, styles.section_1]}>
        <SocialIcon title={t('call')} />
        <SocialIcon title={t('gmail')} />
      </View>

      <View style={[styles.flexRow, styles.section_2]}>
        <Skeleton width={70} height={70} color='#3C5A98' />
        <Skeleton width={70} height={70} color='#DE466E' radius={15} />
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
    color: "#ff4e00",
    marginBottom: 10,
  }
})
