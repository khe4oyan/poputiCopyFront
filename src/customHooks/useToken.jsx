// libs
import React from 'react'
import { useNavigate } from 'react-router-dom';

// utils
import ROUTES from '../utils/routes';

function useToken(){
  const [token, setToken] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadToken = async () => {
      const accessToken = localStorage.getItem("token") || "";
      setToken(accessToken);
    };
  
    loadToken();
  }, []);

  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const navigateToAuth = () => {
    navigate(ROUTES.AUTH_REGISTER);
  }

  return [token, saveToken, deleteToken, navigateToAuth];
}

export default useToken