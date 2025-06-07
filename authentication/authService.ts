// authentication/authService.ts
import { users } from "../database/users";

let currentUser: User | null = null;
const subscribers: ((user: User | null) => void)[] = [];

export type User = {
  username: string;
  email: string;
  status: "admin" | "user";
  profilePhoto: string;
  phone?: string;
  address?: string;
  password?: string;
};

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (user) {
        currentUser = { ...user };
        notify();
        resolve(currentUser);
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, 1000);
  });
};

export const logout = () => {
  currentUser = null;
  notify();
};

export const getUser = () => currentUser;

export const subscribe = (callback: (user: User | null) => void) => {
  subscribers.push(callback);
  callback(currentUser);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
};

const notify = () => {
  for (const callback of subscribers) {
    callback(currentUser);
  }
};

export const updateUser = (updatedData: Partial<User>) => {
  if (!currentUser) return;

  // Actualiza en la base de datos local
  const index = users.findIndex((u) => u.email === currentUser?.email);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    currentUser = { ...users[index] };
    notify();
  }
};
