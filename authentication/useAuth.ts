// Importa React hooks y funciones del servicio de autenticación
import { useEffect, useState } from "react";
import { getUser, subscribe } from "../authentication/authService";

// Este hook personalizado se llama `useAuth`
export const useAuth = () => {
  // Inicializa el estado local `user` con el usuario actualmente autenticado (si existe)
  const [user, setUser] = useState(getUser());

  // Este efecto se ejecuta una vez cuando el componente que usa el hook se monta
  useEffect(() => {
    // Se suscribe al cambio de usuario usando `subscribe` del authService
    // Esto actualiza el estado local `user` cada vez que haya un cambio
    const unsubscribe = subscribe(setUser);

    // La función devuelta se llama automáticamente al desmontar el componente
    // Se usa para cancelar la suscripción y evitar fugas de memoria
    return () => unsubscribe();
  }, []);

  // Devuelve un objeto con la información del usuario actual
  return { user };
};
