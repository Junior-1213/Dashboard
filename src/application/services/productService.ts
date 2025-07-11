import { db } from '../../persistence/api/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import type { Product } from '../../domain/productos/objects/product';

export const getUserProducts = async (userId: string): Promise<Product[]> => {
  const q = query(collection(db, 'products'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Product);
};

export const addUserProduct = async (userId: string, product: Omit<Product, 'id' | 'userId'>) => {
  return await addDoc(collection(db, 'products'), { ...product, userId });
};

export const updateUserProduct = async (userId: string, product: Product) => {
  if (!product.id) throw new Error('Product id is required');
  const ref = doc(db, 'products', product.id);
  return await updateDoc(ref, { ...product, userId });
};

export const deleteUserProduct = async (_userId: string, productId: string) => {
  const ref = doc(db, 'products', productId);
  return await deleteDoc(ref);
};
