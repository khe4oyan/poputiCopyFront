import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { setCar } from '@/store/slices/newRideSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';
import useUserId from '@/customHooks/useUserId';
import { useFocusEffect } from 'expo-router';

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

const CarCard = ({ carData, isSelected }: { carData: any, isSelected: boolean }) => {
  return (
    <View style={[styles.carCard, isSelected && styles.selectedCarCard]}>
      <Text style={styles.headerText}>{carData.make}</Text>

      <CarCardProperty name='Model' value={carData.model} />
      <CarCardProperty name='Year' value={carData.year} />
    </View>
  );
}

const NewRideStep_3 = ({ setIsNextButtonDisabled }: { setIsNextButtonDisabled: any }) => {
  const [cars, setCars] = React.useState<any>([]);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [token] = useToken(); 
  const [userId] = useUserId();

  const [selectedInd, setSelectedInd] = React.useState(-1);

  const carSelect = (ind: number) => {
    setIsNextButtonDisabled(false);
    setSelectedInd(ind);
    dispatch(setCar(ind));
  }

  useFocusEffect(useCallback(() => {
    if (!token || !userId) {
      return;
    }
    
    API.getCarsByUserId(token, userId)
    .then(d => {
      if (d?.data) {
        setCars(d.data);
      }
    });
  }, [token, userId]))

  return (
    <ScrollView style={styles.root}>
      {
        cars.map((item: any) =>
          <TouchableOpacity
            key={item._id}
            onPress={() => carSelect(item._id)}
          >
            <CarCard
              carData={item}
              isSelected={(item._id === selectedInd)}
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
    color: "#A55CCF"
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
    shadowColor: "#A55CCF",
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
