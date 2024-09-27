// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
