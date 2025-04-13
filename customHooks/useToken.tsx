import React from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useToken(): [
  string,
  (token: string) => any,
  () => void,
  () => void,
] {
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    const loadToken = async () => {
      const accessToken = await AsyncStorage.getItem("token") || "";
      setToken(accessToken);
    };
  
    loadToken();
  }, []);

  const router = useRouter();

  const saveToken = (token: string) => {
    setToken(token);
    return AsyncStorage.setItem("token", token);
  };

  const deleteToken = () => {
    AsyncStorage.removeItem("token");
    setToken("");
  };

  const navigateToAuth = () => {
    router.replace("/(root)/auth/register");
  }

  return [token, saveToken, deleteToken, navigateToAuth];
}

export default useToken