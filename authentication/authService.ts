// Define el tipo User con sus propiedades esperadas
export type User = {
  id?: number; // ID del usuario (opcional, normalmente asignado por la base de datos)
  username: string; // Nombre de usuario
  email: string; // Correo electrónico
  status: "admin" | "user"; // Estado del usuario: puede ser 'admin' o 'user'
  profilePhoto: string; // URL o base64 de la foto de perfil
  phone?: string; // Número de teléfono (opcional)
  address?: string; // Dirección (opcional)
  password?: string; // Contraseña (opcional, solo usada en login o registro)
};

// URL base para la API que gestiona los usuarios en el backend
const API_URL = "https://servidorshopapp-hmeuhvejdudchfc3.canadaeast-01.azurewebsites.net/usuarios";

// Variable global para almacenar el usuario actualmente autenticado
let currentUser: User | null = null;

// Lista de funciones que se llamarán cada vez que el usuario actual cambie
const subscribers: ((user: User | null) => void)[] = [];

/**
 * Función para iniciar sesión.
 * Envía email y password al backend, y guarda el usuario recibido en currentUser.
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // Se hace una petición POST a la API de login con el email y la contraseña
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Se convierte a JSON el body
    });

    // Si la respuesta no es exitosa, se lanza un error
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    // Se obtiene el usuario del cuerpo de la respuesta
    const data = await response.json();
    currentUser = data.usuario; // Se guarda en currentUser
    notify(); // Se notifica a los suscriptores del cambio

    // Si no se obtuvo un usuario válido, se lanza error
    if (!currentUser) {
      throw new Error("No se pudo obtener el usuario después del login");
    }

    // Se retorna el usuario autenticado
    return currentUser;
  } catch (err) {
    // Se propaga el error para que el componente que llamó a login lo maneje
    throw err;
  }
};

/**
 * Cierra la sesión del usuario.
 * Borra currentUser y notifica a todos los suscriptores.
 */
export const logout = () => {
  currentUser = null;
  notify();
};

/**
 * Devuelve el usuario actualmente autenticado (puede ser null).
 */
export const getUser = () => currentUser;

/**
 * Permite a otros componentes "suscribirse" a los cambios del usuario actual.
 * Retorna una función que permite cancelar la suscripción.
 */
export const subscribe = (callback: (user: User | null) => void) => {
  subscribers.push(callback); // Se añade el callback a la lista de suscriptores
  callback(currentUser); // Se ejecuta inmediatamente con el estado actual
  return () => {
    // Función para remover el callback si ya no se desea recibir actualizaciones
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
};

/**
 * Notifica a todos los suscriptores que el usuario actual ha cambiado.
 */
const notify = () => {
  for (const callback of subscribers) {
    callback(currentUser); // Se llama a cada callback con el usuario actual
  }
};

/**
 * Actualiza los datos del usuario actual en el backend y localmente.
 * Solo funciona si hay un usuario autenticado y tiene ID.
 */
export const updateUser = async (updatedData: Partial<User>) => {
  // Si no hay usuario autenticado o no tiene ID, no se hace nada
  if (!currentUser || !currentUser.id) return;

  // Se crea una copia del usuario actual fusionado con los nuevos datos
  const updatedUser = { ...currentUser, ...updatedData };

  // Se envía la petición PUT para actualizar al usuario en el backend
  const response = await fetch(`${API_URL}/${currentUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser), // Se envía el usuario actualizado
  });

  // Si hay error en la respuesta, se lanza una excepción
  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }

  // Se actualiza el usuario local y se notifica a los suscriptores
  currentUser = updatedUser;
  notify();
};

/**
 * Registra un nuevo usuario en el sistema enviando sus datos al backend.
 */
export const register = async (userData: User): Promise<void> => {
  // Se hace una petición POST a la ruta /registro con los datos del usuario
  const response = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData), // Se convierte el objeto a JSON
  });

  // Si la respuesta no fue exitosa, se lanza error
  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }
};
