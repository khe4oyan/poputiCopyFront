import React from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useUserId(): [
  string,
  (userId: string) => any,
  () => void,
] {
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    const loadUserId = async () => {
      const accessUserId = await AsyncStorage.getItem("userId") || "";
      setUserId(accessUserId);
    };
  
    loadUserId();
  }, []);

  const router = useRouter();

  const saveUserId = (userId: string) => {
    setUserId(userId);
    return AsyncStorage.setItem("userId", userId);
  };

  const deleteUserId = () => {
    AsyncStorage.removeItem("userId").then(() => {
      setUserId("");
    });
  };

  return [userId, saveUserId, deleteUserId];
}

export default useUserId