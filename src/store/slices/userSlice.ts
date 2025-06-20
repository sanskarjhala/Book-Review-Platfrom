
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';

interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
}

interface UserState {
  profile: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (userId: string) => {
  return await userApi.getUserProfile(userId);
});

export const updateUserProfile = createAsyncThunk('user/updateProfile', async ({ userId, userData }: { userId: string; userData: any }) => {
  return await userApi.updateUserProfile(userId, userData);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export default userSlice.reducer;
