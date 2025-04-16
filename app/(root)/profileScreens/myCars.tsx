import { Button, FlatList, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Skeleton from '@/components/skeleton'
import CustomInput from '@/components/custom/customInput';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';

type carDataType = {
  mark: string,
  model: string,
  // carNum: string,
  year: string | number,
  // pass: any,
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
  const onDeleteCar = () => {
    // TODO: delete car
  };

  return (
    <View style={styles.carCard}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{carData.mark}</Text>
        <TouchableOpacity onPress={onDeleteCar}>
          <Text style={styles.carCardDeleteButton}>delete</Text>
        </TouchableOpacity>
      </View>

      <CarCardProperty name='Model' value={carData.model} />
      {/* <CarCardProperty name='Number' value={carData.carNum} /> */}
      <CarCardProperty name='Year' value={carData.year} />
      {/* <CarCardProperty name='Document'>
        <Text>
          {carData.pass ?
            <Skeleton width={15} height={15} radius="100%" color='#00BE00' /> :
            <Skeleton width={15} height={15} radius="100%" color='#BE0000' />
          }
        </Text>
      </CarCardProperty> */}
    </View>
  );
}

const MyCars = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [cars, setCars] = React.useState<Array<carDataType>>([]);
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const [token] = useToken();

  const onNewCarHandler = () => {
    setIsShowModal(true);
  };

  const addButton = () => {
    API.carCreate(token, mark, model, year)
    .then(d => {
      setCars(prev => {
        return [...prev, {mark, model, year}]
      });
      setIsShowModal(false);
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.addCarContainer}>
        <Skeleton width={20} height={20} radius="100%" color='#ff4e00' />
        <TouchableOpacity onPress={onNewCarHandler}>
          <Text style={styles.addCarText}>Add car</Text>
        </TouchableOpacity>
      </View>

      {
        isShowModal &&
        <View>
          <CustomInput 
            placeholder='mark'
            value={mark}
            setValue={setMark}
          />
          <CustomInput 
            placeholder='model'
            value={model}
            setValue={setModel}
          />
          <CustomInput 
            placeholder='year'
            value={year}
            setValue={setYear}
          />
          
          <Button 
            title='Add'
            onPress={addButton}
          />
        </View>
      }

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

  carCardDeleteButton: {
    color: 'red',
    borderWidth: 1,
    borderColor: "red",

    borderRadius: 5,
    padding: 10,
    paddingTop: 3,
    paddingBottom: 3,
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