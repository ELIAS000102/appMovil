import { useEffect, useState } from "react";
import {
  getUser,
  login,
  logout,
  updateUser,
  subscribe,
  User,
} from "../authentication/authService";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getUser());

  useEffect(() => {
    const unsubscribe = subscribe(setUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    login,
    logout,
    updateUser,
  };
};
