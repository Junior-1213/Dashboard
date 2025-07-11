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
import type { User } from '../../domain/usuarios/objects/user';

export const getUserUsers = async (ownerId: string): Promise<User[]> => {
  const q = query(collection(db, 'users'), where('ownerId', '==', ownerId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as User);
};

export const addUserUser = async (ownerId: string, user: Omit<User, 'id' | 'ownerId'>) => {
  return await addDoc(collection(db, 'users'), { ...user, ownerId });
};

export const updateUserUser = async (ownerId: string, user: User) => {
  if (!user.id) throw new Error('User id is required');
  const ref = doc(db, 'users', user.id);
  return await updateDoc(ref, { ...user, ownerId });
};

export const deleteUserUser = async (_ownerId: string, userIdToDelete: string) => {
  const ref = doc(db, 'users', userIdToDelete);
  return await deleteDoc(ref);
};
