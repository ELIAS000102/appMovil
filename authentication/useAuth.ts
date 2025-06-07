// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getUser, subscribe } from "../authentication/authService";

export const useAuth = () => {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const unsubscribe = subscribe(setUser);
    return () => unsubscribe();
  }, []);

  return { user };
};
