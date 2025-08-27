import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { useSelector, type TypedUseSelectorHook } from 'react-redux'

export interface ProductData {
  id?: number;
  name: string;
  description?: string;
  price: number;
}

export interface Product extends ProductData {
  id: number;
  creationDate: number;
}

// Define a type for the slice state
interface ProductsState {
  products: Product[];
  action: 'idle' | 'add_product' | 'edit_product' | 'delete_product';
  selectedProduct?: Product;
}

// const generateItems = (): Product[] => {
//   const items: Product[] = [];
//   for (let i = 1; i <= 4; i++) {
//     items.push({
//       id: i,
//       name: `Product ${i}`,
//       description: `Description for Product ${i}`,
//       price: i * 100,
//       creationDate: new Date().getTime()
//     });
//   }
//   return items;
// }

const getItemsFromLocalStorage = () => {
  const items = localStorage.getItem('products');
  let results = items ? JSON.parse(items) : [];
  return results;
}

// Define the initial state using that type
const initialState: ProductsState = {
  products: getItemsFromLocalStorage(),
  action: 'idle',
  selectedProduct: undefined
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state) => {
      state.action = 'add_product';
      state.selectedProduct = undefined;
    },
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      const data = state.products.find(product => product.id === action.payload);
      if (!data) return;
      state.action = 'edit_product';
      state.selectedProduct = data;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.action = 'delete_product';
      state.products = state.products.filter(product => product.id !== action.payload);
      state.selectedProduct = undefined;

      localStorage.setItem('products', JSON.stringify(state.products));
    },
    saveProduct: (state, action: PayloadAction<ProductData>) => {
      if (action.payload.id) {
        // update exiting product
        const existingProduct = state.products.find(p => p.id === action.payload.id);
        if (existingProduct) {
          existingProduct.name = action.payload.name;
          existingProduct.description = action.payload.description;
          existingProduct.price = action.payload.price;
        }
      }
      else {
        // create new product
        const newProduct: Product = {
          ...action.payload,
          id: state.products.length + 1,
          creationDate: Date.now()
        }
        state.products.push(newProduct);
      }

      state.selectedProduct = undefined;
      state.action = 'idle'

      localStorage.setItem('products', JSON.stringify(state.products));
    }
  },
})

export const {
  addProduct,
  setSelectedProductId,
  deleteProduct,
  saveProduct
} = productsSlice.actions

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector