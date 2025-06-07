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
    profilePhoto: "https://sdmntprwestus.oaiusercontent.com/files/00000000-3644-6230-976b-01e29722cf7a/raw?se=2025-06-07T06%3A32%3A28Z&sp=r&sv=2024-08-04&sr=b&scid=76be6220-5ca9-5add-9e75-f5123f8981ec&skoid=31bc9c1a-c7e0-460a-8671-bf4a3c419305&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-07T01%3A13%3A42Z&ske=2025-06-08T01%3A13%3A42Z&sks=b&skv=2024-08-04&sig=KmC%2BwgHuMxpqKBVFoT0Yd46dami0JexsUgmk5y9SbUU%3D",
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
