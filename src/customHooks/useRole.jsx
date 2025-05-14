// libs
import { useState } from "react";

export default function useRole() {
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");

  const saveRole = (role) => {
    localStorage.setItem("role", role);
    setRole(role);
  };

  const deleteRole = () => {
    localStorage.removeItem("role");
    setRole("");
  };

  return [role, saveRole, deleteRole];
}