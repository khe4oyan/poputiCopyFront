import { StyleSheet, Text, View } from 'react-native'
import Skeleton from '@/components/skeleton'

type socialIconPropsType = {
  title: string,
  icon?: any,
}

const SocialIcon = ({ title, icon }: socialIconPropsType) => {
  // TODO: add real icons
  return (
    <View style={styles.socialIconContainer}>
      <Skeleton color='#ff4e00' height={30} width={30} />
      <Text>{title}</Text>
    </View>
  );
}

const Feedback = () => {
  return (
    <View style={styles.root}>
      <View style={[styles.flexRow, styles.flexBetween, styles.section_1]}>
        <SocialIcon title="Call" />
        <SocialIcon title="Gmail" />
      </View>

      <View style={[styles.flexRow, styles.section_2]}>
        <Skeleton width={70} height={70} color='#3C5A98' />
        <Skeleton width={70} height={70} color='#DE466E' radius={15} />
      </View>

      <View style={[styles.section_3]}>
        <Text style={styles.headerText}>About Us</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quaerat, tempora maiores odit earum possimus sapiente impedit laborum iure totam quae debitis modi nulla corporis autem. Veritatis quaerat dolorem perferendis.
          Modi sapiente doloribus sed consequuntur sit tenetur a excepturi rerum incidunt quis ab rem, perferendis odit culpa nesciunt harum quidem. Officia nihil eligendi molestias distinctio cumque eaque reiciendis impedit qui?
          Fugiat illum dignissimos eos laborum! Sit nihil modi, ratione, eum sed tempora earum consectetur cupiditate quos dolorum ad numquam in repellendus eaque? Beatae dolor aliquam mollitia. Tempore sit commodi modi!
          Magnam eligendi asperiores quidem itaque facere esse! Nemo sequi a, esse sit reiciendis vero quia quos iste voluptates porro maiores repellat, culpa minima inventore dolorem. Iste, nulla vel. Eius, illo.
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