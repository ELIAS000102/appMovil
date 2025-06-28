import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const modalWidth = width * 0.85;
const CARD_WIDTH = width / 2 - 24;
const imageSize = width * 0.8;

export const styles = StyleSheet.create({
  //Estilos para la navegación por pestañas (tabs.tsx)
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#2A5784', // Color de fondo
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
    color: '#FFFFFF',
  },
  tabItem: {
    paddingVertical: 6,
    height: 50,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerFocused: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFocused: {
    transform: [{ scale: 1.05 }],
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
    color: "#2E7D32", // verde oscuro
  },
  inputLogin: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonLogin: {
    backgroundColor: "#43A047", // verde vibrante
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
    color: "#43A047", // verde vibrante
    textAlign: "center",
    marginTop: 10,
  },
  //Estilos del componente de perfil de usuario (perfilUser.tsx)
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
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
    color: "#2E7D32", // verde oscuro
  },
  inputSingIn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonSingIn: {
    backgroundColor: "#388E3C", // verde intenso
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
    color: "#388E3C", // verde intenso
    textAlign: "center",
    marginTop: 10,
  },
  //Estilos del botón de login en la pantalla principal (buttonLogin.tsx)
   button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 100,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  //Estilos del modal de carrito (CartModal.tsx)
  modalCardModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  containerCardModal: {
    backgroundColor: "white",
    borderRadius: 16,
    width: modalWidth,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    position: "relative",
  },
  closeButtonCardModal: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
  iconContainerCardModal: {
    backgroundColor: "#E8F5E9",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconShadowCardModal: {
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  titleCardModal: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleCardModal: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  footerCardModal: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    width: "100%",
    justifyContent: "center",
  },
  footerTextCardModal: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
    marginLeft: 8,
  },
  // Estilos del componente de tarjeta de producto (productCard.tsx)
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.9,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  stockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stockText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a9d8f',
  },
  inStockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  outOfStockText: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  // Estilos del componente de detalles del producto (productDetails.tsx)
   modalProductDetails: {
    margin: 0,
    justifyContent: "flex-end",
  },
  containerProductDetails: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  closeButtonProductDetails: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageProductDetails: {
    width: imageSize,
    height: imageSize,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoContainerProductDetails: {
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  priceStockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  priceProductDetails: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2a9d8f",
  },
  stock: {
    fontSize: 14,
    fontWeight: "500",
  },
  inStock: {
    color: "#2a9d8f",
  },
  outOfStock: {
    color: "#e76f51",
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#000000FF",
    lineHeight: 22,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  quantityButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#2a9d8f",
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledAddToCart: {
    backgroundColor: "#ccc",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  relatedContainer: {
  marginTop: 20,
  paddingHorizontal: 10,
},

  // Estilos del componente de filtro de productos (productSearch.tsx)
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 8,
    height: 40,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2A5784FF", // verde oscuro
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputWrapper: {
    height: 40,
    marginLeft: 8,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    height: 40,
    width: "85%",
    backgroundColor: "#CBEDF2FF", // azul claro
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
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
  closeButtonLoginScreeen: {
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

  },
  //Estilos de los componentes de filtro de categorías y precios (categoryFilterModal.tsx y priceFilterModal.tsx)
  modalOverlayGalery: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainerGalery: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    maxHeight: "80%",
  },
  modalHeaderGalery: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  closeButtonGalery: { padding: 6 },
  closeButtonTextGalery: { fontSize: 20, color: "#444" },
  modalContentGalery: { flexDirection: "row", gap: 12 },
  categoryColumnGalery: { flex: 1 },
  columnTitleGalery: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  categoryItemGalery: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  selectedItemGalery: { backgroundColor: "#cde" },
  categoryTextGalery: { fontSize: 14 },
  selectedTextGalery: { fontWeight: "bold" },
  noSubTextGalery: { fontStyle: "italic", color: "#666" },
  clearFiltersGalery: {
    marginTop: 16,
    textAlign: "center",
    color: "#007bff",
    fontWeight: "500",
  },
  priceFilterContentGalery: { padding: 10 },
  inputGalery: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  priceLabelGalery: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
  applyButtonGalery: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonTextGalery: { color: "#fff", fontSize: 16 },
  //Estilos de la pantalla de inicio (homeScreen.tsx)
  safeAreaGalery: { flex: 1, backgroundColor: "#ffffff" },
  containerGalery: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#ffffff",
  },
  headerGalery: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftContainerGalery: { flex: 1 },
  rightContainerGalery: { justifyContent: "flex-end" },
  filterButtonsContainerGalery: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  filterButtonGalery: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  filterButtonTextGalery: { fontSize: 14, color: "#333" },
  productsContainerGalery: { paddingBottom: 180 },
  productsGridGalery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyStateGalery: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyTextGalery: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtextGalery: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  //Estilos de los componentes de la información del usuario (userScreen.tsx)
  containerUser: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContentUser: {
    paddingBottom: 180,
  },
  profileSectionUser: {
    alignItems: 'center',
    marginVertical: 24,
    marginBottom: 16,
  },
  profileImageContainerUser: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImageUser: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#e2e8f0',
  },
  editPhotoButtonUser: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  nameUser: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardUser: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoSectionUser: {
    paddingVertical: 12,
  },
  labelUser: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
    fontWeight: '500',
  },
  fieldContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  valueUser: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    flex: 1,
  },
  inputUser: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 6,
    flex: 1,
  },
  iconsContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconButtonUser: {
    padding: 6,
    marginLeft: 4,
  },
  dividerUser: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  logoutButtonUser: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },
  logoutTextUser: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutIconUser: {
    marginLeft: 10,
  },
  centeredUser: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f8fafc',
  },
  messageUser: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginVertical: 20,
  },
  loginButtonUser: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonTextUser: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
