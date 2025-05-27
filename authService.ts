// authService.ts

export const loginUser = async (email: string, password: string) => {
  // Aquí iría tu lógica real, por ejemplo con Firebase o una API propia
  // Simulamos una respuesta con un delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@correo.com" && password === "123456") {
        resolve({ success: true, message: "Usuario autenticado" });
      } else {
        reject({ success: false, message: "Credenciales inválidas" });
      }
    }, 1000);
  });
};
