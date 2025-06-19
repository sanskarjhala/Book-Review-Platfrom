
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: 'Alice Johnson',
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;
