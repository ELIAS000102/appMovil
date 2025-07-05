// Importa la base de datos local de usuarios
import { users } from "../database/users";

// Variable global para almacenar al usuario actualmente autenticado
let currentUser: User | null = null;

// Arreglo de funciones (suscriptores) que serán llamadas cada vez que cambie el usuario
const subscribers: ((user: User | null) => void)[] = [];

// Definición del tipo de datos que representa a un usuario
export type User = {
  username: string;
  email: string;
  status: "admin" | "user";
  profilePhoto: string;
  phone?: string;
  address?: string;
  password?: string;
};

// Función para iniciar sesión
// Simula una espera con `setTimeout` de 1 segundo (como si fuera una petición a un servidor)
// Verifica si las credenciales coinciden con algún usuario en la base de datos
export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => 
          u.email.trim().toLowerCase() === email.trim().toLowerCase() && 
          u.password === password
      );

      if (user) {
        currentUser = { ...user }; // Guarda al usuario autenticado
        notify(); // Notifica a los suscriptores que hay un nuevo usuario activo
        resolve(currentUser); // Devuelve el usuario autenticado
      } else {
        reject(new Error("Credenciales inválidas")); // Si no encuentra coincidencia, lanza error
      }
    }, 1000);
  });
};

// Cierra la sesión del usuario
export const logout = () => {
  currentUser = null;
  notify(); // Notifica a todos los suscriptores que el usuario ha cerrado sesión
};

// Retorna el usuario actualmente autenticado
export const getUser = () => currentUser;

// Permite que otros componentes se suscriban a los cambios de estado del usuario
// Devuelve una función que se puede usar para cancelar la suscripción
export const subscribe = (callback: (user: User | null) => void) => {
  subscribers.push(callback);   // Agrega el callback a la lista
  callback(currentUser);        // Llama al callback inmediatamente con el usuario actual
  return () => {
    const index = subscribers.indexOf(callback); // Encuentra su posición
    if (index !== -1) subscribers.splice(index, 1); // Lo elimina si existe
  };
};

// Llama a todos los suscriptores con el usuario actual
const notify = () => {
  for (const callback of subscribers) {
    callback(currentUser);
  }
};

// Actualiza los datos del usuario tanto en `users` como en `currentUser`
export const updateUser = (updatedData: Partial<User>) => {
  if (!currentUser) return; // Si no hay usuario, no hace nada

  const index = users.findIndex((u) => u.email === currentUser?.email); // Busca al usuario en la base de datos
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData }; // Actualiza sus datos
    currentUser = { ...users[index] }; // Actualiza el usuario actual
    notify(); // Notifica a los suscriptores que ha habido un cambio
  }
};
