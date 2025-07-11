import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../persistence/config/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import type { User } from '@/domain/usuarios/objects/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users: User[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() } as User);
  });
  return users;
});

export const addUser = createAsyncThunk('users/addUser', async (user: Omit<User, 'id'>) => {
  const docRef = await addDoc(collection(db, 'users'), user);
  return { id: docRef.id, ...user } as User;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  const { id, ...data } = user;
  await updateDoc(doc(db, 'users', id), data);
  return user;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await deleteDoc(doc(db, 'users', id));
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user: User) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user: User) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
