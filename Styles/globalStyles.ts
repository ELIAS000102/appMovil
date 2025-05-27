import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  productCard: {
    borderRadius: 16,
    backgroundColor: "#ffffff", // fondo limpio
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    margin: 8,
    width: 160,
  },

  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 8,
  },

  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },

  toggleButton: {
    backgroundColor: "#2C3E50", // botón azul oscuro profesional
    padding: 12,
    borderRadius: 12,
  },

  containerProducts: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // estilos del buscador
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2C3E50", // azul oscuro
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  searchInputWrapper: {
    marginLeft: 10,
    overflow: "hidden",
  },

  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "white", // gris claro profesional
    borderRadius: 10,
    flex: 1,
    color: "black", // texto azul oscuro
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },
  //estilo del boton de inicio de sesión de la pantalla de inicio
    loginButtonHome: {
        backgroundColor: "#2C3E50",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        position: "absolute", // 🟡 CLAVE
        right: 10,
        width: 70, // ancho del botón
        height: 40, // alto del botón
    },

    textLoginButton: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        
    },
});
