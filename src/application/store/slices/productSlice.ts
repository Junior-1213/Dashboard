import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Product } from '@/domain/productos/objects/product';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as Product);
  });
  return products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Omit<Product, 'id'>) => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return { id: docRef.id, ...product } as Product;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: Product) => {
  const { id, ...data } = product;
  await updateDoc(doc(db, 'products', id), data);
  return product;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product: Product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product: Product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
