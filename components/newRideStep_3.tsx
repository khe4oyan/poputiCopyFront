import { ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Skeleton from './skeleton';
import { setCar } from '@/store/slices/newRideSlice';
import { useDispatch } from 'react-redux';

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
      <Text>{value}</Text>
      {children}
    </View>
  );
}

const CarCard = ({ carData, isSelected }: { carData: carDataType, isSelected: boolean }) => {
  return (
    <View style={[styles.carCard, isSelected && styles.selectedCarCard]}>
      <Text style={styles.headerText}>{carData.mark}</Text>

      <CarCardProperty name='Model' value={carData.model} />
      <CarCardProperty name='Number' value={carData.carNum} />
      <CarCardProperty name='Year' value={carData.year} />
      <CarCardProperty name='Document'>
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

const NewRideStep_3 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
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

  const dispatch = useDispatch();

  const [selectedInd, setSelectedInd] = React.useState(-1);

  const carSelect = (ind: number) => {
    setIsNextButtonDisabled(false);
    setSelectedInd(ind);
    dispatch(setCar(cars[selectedInd]));
  }

  return (
    <ScrollView style={styles.root}>
      {
        cars.map((item, ind) =>
          <TouchableOpacity
            key={ind}
            onPress={() => carSelect(ind)}
          >
            <CarCard
              carData={item}
              isSelected={(ind === selectedInd)}
            />
          </TouchableOpacity>
        )
      }
    </ScrollView>
  )
}

export default NewRideStep_3


const styles = StyleSheet.create({
  root: {
    maxHeight: 500,
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

  selectedCarCard: {
    shadowColor: "#ff4e00",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },

  headerText: {
    fontWeight: 800,
    fontSize: 18,
  },

  property: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#0001",
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: .5,
  },
})