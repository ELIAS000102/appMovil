import axios from 'axios';
import { Product } from '../database/products';

const API_URL = 'https://shopapp-backend-aeh8gsbegxdva5bc.brazilsouth-01.azurewebsites.net/productos';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);

    const productos = response.data.map((p: any) => ({
      ...p,
      categories: typeof p.categories === "string" ? JSON.parse(p.categories) : p.categories
    }));

    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};
