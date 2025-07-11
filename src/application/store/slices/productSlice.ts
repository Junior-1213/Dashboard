import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@/domain/productos/objects/product';
import { addUserProduct, deleteUserProduct, getUserProducts, updateUserProduct } from '../../services/productService';

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

export const fetchProducts = createAsyncThunk<Product[], string>(
  'products/fetchProducts',
  async (userId) => {
    return await getUserProducts(userId);
  }
);

export const addProduct = createAsyncThunk<Product, { userId: string, product: Omit<Product, 'id' | 'userId'> }>(
  'products/addProduct',
  async ({ userId, product }) => {
    const docRef = await addUserProduct(userId, product);
    return { id: docRef.id, ...product, userId } as Product;
  }
);

export const updateProduct = createAsyncThunk<Product, { userId: string, product: Product }>(
  'products/updateProduct',
  async ({ userId, product }) => {
    await updateUserProduct(userId, product);
    return product;
  }
);

export const deleteProduct = createAsyncThunk<string, { userId: string, id: string }>(
  'products/deleteProduct',
  async ({ userId, id }) => {
    await deleteUserProduct(userId, id);
    return id;
  }
);

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
