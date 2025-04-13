import React from 'react'
import { useRouter } from 'expo-router';

function useToken(): [
  string,
  (token: string) => void,
  () => void,
  () => void,
] {
  const [token, setToken] = React.useState(() => {
    // TODO: load in storage;
    return "";
  });

  const router = useRouter();

  const saveToken = (token: string) => {
    // TODO: save token in storage
  };

  const deleteToken = () => {
    // TODO: delete token
  };

  const navigateToAuth = () => {
    router.push("/(root)/auth/login");
  }

  return [token, saveToken, deleteToken, navigateToAuth];
}

export default useToken