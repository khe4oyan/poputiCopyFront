import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import Skeleton from '@/components/skeleton'
import { useTranslation } from 'react-i18next';
import CustomInput from '@/components/custom/customInput';
import API from '@/utils/API';
import useToken from '@/customHooks/useToken';
import useUserId from '@/customHooks/useUserId';
import { useFocusEffect } from 'expo-router';
import CustomFilesInput from '@/components/custom/customFilesInput';

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

const CarCard = ({ carData, deleteOneById }: any) => {
  const { t } = useTranslation();
  const [token] = useToken();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteCar = () => {
    setIsDeleting(true);
    API.carDeleteById(token, carData?._id)
    .then(d => {
      if (d?.message === 'deleted') {
        deleteOneById(carData?._id);
      }
    });
  };
  
  return (
    <View style={styles.carCard}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{carData?.make}</Text>
        <TouchableOpacity onPress={onDeleteCar}>
          <Text style={styles.carCardDeleteButton}>delete</Text>
        </TouchableOpacity>
      </View>

      <CarCardProperty name={t('model')} value={carData?.model} />
      <CarCardProperty name={t('year')} value={carData?.year} />

      {
        isDeleting &&
        <View style={styles.deletingContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      }
    </View>
  );
}

const MyCars = () => {
  const { t } = useTranslation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [cars, setCars] = React.useState<any>([]);
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [carPhotos, setCarPhotos] = useState([]);

  const [token] = useToken();
  const [userId] = useUserId();

  const onNewCarHandler = () => {
    setIsShowModal(true);
  };

  const deleteOneById = (id: string) => {
    setCars((prev: any) => {
      return prev.filter((item: any) => item?._id !== id);
    });
  }

  const addButton = () => {
    API.carCreate(token, mark, model, year, carPhotos)
      .then(d => {
        if (d?.data) {
          setCars((prev: any) => {
            return [...prev, d.data]
          });
          setIsShowModal(false);
        } else {
          Alert.alert("FAILED", "Cant create car. Try later");
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (!token || !userId) {
        return;
      }
      API.getCarsByUserId(token, userId)
        .then(d => {
          if (d?.data) {
            setCars(d.data);
          }
        });
    }, [token, userId])
  );

  return (
    <View style={styles.root}>
      <View style={styles.addCarContainer}>
        <Image
          width={25}
          height={25}
          borderRadius={25}
          source={{ uri: "https://img.icons8.com/m_rounded/512/FAB005/plus.png" }}
        />
        <TouchableOpacity onPress={onNewCarHandler}>
          <Text style={styles.addCarText}>{t('addCar')}</Text>
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

          <CustomFilesInput 
            title="Car images"
            value={carPhotos}
            setValue={setCarPhotos}
          />

          <Button
            title='Add'
            onPress={addButton}
          />
        </View>
      }

      <FlatList
        data={cars}
        renderItem={({ item }) =>
          <CarCard
            key={item?._id}
            carData={item}
            deleteOneById={deleteOneById}
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
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",

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

  deletingContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    backgroundColor: "#fffe",
    width: "109%",
    height: "134%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  }
})
