import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  //Los estilos para la pantalla de carga de la aplicación (loadingScreen.tsx)
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Fondo blanco
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#5E2A84", // texto morado oscuro
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 60,
  },
  bar: {
    width: 10,
    height: 40,
    backgroundColor: "#9B59B6", // morado vibrante
    marginHorizontal: 5,
    borderRadius: 5,
  },
  //Estilos del componente de login (login.tsx)
  containerLogin: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleLogin: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5E2A84", // morado oscuro
  },
  inputLogin: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonLogin: {
    backgroundColor: "#9B59B6", // morado vibrante
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonTextLogin: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  switchTextLogin: {
    color: "#9B59B6", // morado vibrante
    textAlign: "center",
    marginTop: 10,
  },
  //Estilos del componente de registro (singIn.tsx)
  containerSingIn: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleSingIn: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5E2A84", // morado oscuro
  },
  inputSingIn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonSingIn: {
    backgroundColor: "#8E44AD", // morado intenso
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonTextSingIn: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  switchTextSingIn: {
    color: "#8E44AD", // morado intenso
    textAlign: "center",
    marginTop: 10,
  },
  //Estilos del botón de login en la pantalla principal (buttonLogin.tsx)
  loginButtonHome: {
    backgroundColor: "#5E2A84", // morado oscuro
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
  //Estilos del modal de carrito (CartModal.tsx)
  modalContentCart: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8E44AD", // morado intenso
    marginTop: 10,
  },
  // Estilos del componente de tarjeta de producto (productCard.tsx)
  productImageCard: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 8,
  },

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
  // Estilos del componente de detalles del producto (productDetails.tsx)
  fullScreenModal: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  productImage: {
    width: "100%",
    height: height * 0.4, // Ajusta la altura según el tamaño de la pantalla
    resizeMode: "cover",
    borderRadius: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    color: "#5E2A84", // morado oscuro
  },
  productPrice: {
    fontSize: 18,
    color: "#8E44AD", // morado intenso
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: "#9B59B6", // morado vibrante
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Estilos del componente de filtro de productos (productFilter.tsx)
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#5E2A84", // morado oscuro
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
    backgroundColor: "white",
    borderRadius: 10,
    width: 240, // ancho del input
    color: "black",
  },
  //Estilos de la pantalla de login (loginScreen.tsx)
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // fondo oscuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.85)", // fondo blanco semitransparente
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
    color: "#444",
    fontWeight: "bold",
  },
  //Estilos de la pantalla de inicio (homeScreen.tsx)
  galeryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5E2A84", // morado oscuro
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },

  containerProducts: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
