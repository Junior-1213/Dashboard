import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '@/domain/usuarios/objects/user';
import { getUserUsers, addUserUser, updateUserUser, deleteUserUser } from '../../services/userService';

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

export const fetchUsers = createAsyncThunk<User[], string>(
  'users/fetchUsers',
  async (ownerId) => {
    return await getUserUsers(ownerId);
  }
);

export const addUser = createAsyncThunk<User, { ownerId: string, user: Omit<User, 'id' | 'ownerId'> }>(
  'users/addUser',
  async ({ ownerId, user }) => {
    const docRef = await addUserUser(ownerId, user);
    return { id: docRef.id, ...user, ownerId } as User;
  }
);

export const updateUser = createAsyncThunk<User, { ownerId: string, user: User }>(
  'users/updateUser',
  async ({ ownerId, user }) => {
    await updateUserUser(ownerId, user);
    return { ...user, ownerId };
  }
);

export const deleteUser = createAsyncThunk<string, { ownerId: string, id: string }>(
  'users/deleteUser',
  async ({ ownerId, id }) => {
    await deleteUserUser(ownerId, id);
    return id;
  }
);

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
