// redux/userActions.js
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:5000/api/users';

// Async thunk for user registration
export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk for user login
export const login = createAsyncThunk('user/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk for changing user password
export const changeUserPassword = createAsyncThunk('user/changePassword', async ({ token, passwordData }, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer for logging out the user
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling pending state for register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling fulfilled state for register
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      // Handling rejected state for register
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling pending state for login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling fulfilled state for login
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      // Handling rejected state for login
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling pending state for changing password
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handling fulfilled state for changing password
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      // Handling rejected state for changing password
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
