import React from 'react'

function useUserId(){
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    const loadUserId = async () => {
      const accessUserId = localStorage.getItem("userId") || "";
      setUserId(accessUserId);
    };
  
    loadUserId();
  }, []);


  const saveUserId = (userId) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const deleteUserId = () => {
    localStorage.removeItem("userId");
    setUserId("");
  };

  return [userId, saveUserId, deleteUserId];
}

export default useUserId