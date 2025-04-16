import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Skeleton from '@/components/skeleton'
import { useTranslation } from 'react-i18next';

type carDataType = {
  mark: string,
  model: string,
  carNum: string,
  year: number,
  pass: any,
};

type carCardPropertyType = {
  name: string,
  value?: string | number,
  children?: any
};

const CarCardProperty = ({ name, value, children }: carCardPropertyType) => {
  return (
    <View style={styles.property}>
      <Text>{name}</Text>
      {
        value &&
        <Text>{value}</Text>
      }
      {children}
    </View>
  );
}

const CarCard = ({ carData }: { carData: carDataType }) => {
  const { t } = useTranslation();

  // TODO: add 3 point menu touch handler
  return (
    <View style={styles.carCard}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{carData.mark}</Text>
        <Skeleton width={10} height={20} />
      </View>

      <CarCardProperty name={t('model')} value={carData.model} />
      <CarCardProperty name={t('number')} value={carData.carNum} />
      <CarCardProperty name={t('year')} value={carData.year} />
      <CarCardProperty name={t('document')}>
        <Text>
          {carData.pass ?
            <Skeleton width={15} height={15} radius="100%" color='#00BE00' /> :
            <Skeleton width={15} height={15} radius="100%" color='#BE0000' />
          }
        </Text>
      </CarCardProperty>
    </View>
  );
}

const MyCars = () => {
  const { t } = useTranslation();

  const [cars, setCars] = React.useState<Array<carDataType>>([
    {
      mark: "Opel",
      model: "Zafira",
      carNum: "36xm897",
      year: 2000,
      pass: true,
    },
    {
      mark: "Opel",
      model: "Vectra B",
      carNum: "44xm894",
      year: 2013,
      pass: null,
    },
  ]);

  // TODO: new car add button handler
  return (
    <View style={styles.root}>
      <View style={styles.addCarContainer}>
        <Skeleton width={20} height={20} radius="100%" color='#ff4e00' />
        <Text style={styles.addCarText}>{t('addCar')}</Text>
      </View>

      <FlatList
        data={cars}
        renderItem={({ item, index }) =>
          <CarCard
            key={index}
            carData={item}
          />
        }
      />
    </View>
  )
}

export default MyCars

const styles = StyleSheet.create({
  root: {
    padding: 10,
    paddingTop: 20,
    flex: 1,
  },

  addCarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "flex-end",
    gap: 10,
  },

  addCarText: {
    color: "#ff4e00"
  },

  carCard: {
    margin: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .1,
    shadowRadius: 5
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  headerText: {
    fontWeight: 800,
    fontSize: 18,
  },

  property: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    borderBottomColor: "#0001",
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: .5,
  },
})
