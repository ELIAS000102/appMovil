// Definimos una interfaz para los usuarios
export interface User {
  username: string;
  email: string;
  password: string;
  profilePhoto: string;
  phone: string;
  address: string;
  status: "admin" | "user"; // 'admin' para administrador, 'user' para usuario normal
}

// Lista de usuarios simulados
export const users: User[] = [
  {
    username: "ELIAS01",
    email: "josejavierhm2014@gmail.com",
    password: "elias1234",
    profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+52 5512345678",
    address: "Av. Reforma 123, Ciudad de México, CDMX, México",
    status: "admin"
  },
  {
    username: "maria.garcia",
    email: "maria.garcia@hotmail.com",
    password: "M4ri@2025!",
    profilePhoto: "https://randomuser.me/api/portraits/women/5.jpg",
    phone: "+34 612345678",
    address: "Calle Alcalá 45, Madrid, España",
    status: "user"
  },
  {
    username: "carlos_rdz",
    email: "carlos.rdz@example.com",
    password: "CRdz#1234",
    profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+57 3209876543",
    address: "Carrera 45 #12-34, Medellín, Colombia",
    status: "user"
  },
  {
    username: "valentina_q",
    email: "valentina.quintero@gmail.com",
    password: "V@leQuint2025",
    profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+56 912345678",
    address: "Av. Providencia 1234, Santiago, Chile",
    status: "user"
  },
  {
    username: "andres.morales",
    email: "andres.morales@gmail.com",
    password: "Andr3sM2025",
    profilePhoto: "https://randomuser.me/api/portraits/men/21.jpg",
    phone: "+51 987654321",
    address: "Jr. Los Álamos 101, Lima, Perú",
    status: "user"
  },
  {
    username: "sofia_hernandez",
    email: "sofia.hdz@hotmail.com",
    password: "S0fi@2025!",
    profilePhoto: "https://randomuser.me/api/portraits/women/23.jpg",
    phone: "+54 91123456789",
    address: "Av. Córdoba 4567, Buenos Aires, Argentina",
    status: "user"
  }
];
