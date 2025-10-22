// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
//   status: 'idle',
//   error: null,
// }

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials(state, action) {
//       const { user, accessToken, refreshToken } = action.payload
//       state.user = user
//       state.accessToken = accessToken
//       state.refreshToken = refreshToken
//       state.status = 'succeeded'
//       state.error = null
//     },
//     clearCredentials(state) {
//       state.user = null
//       state.accessToken = null
//       state.refreshToken = null
//       state.status = 'idle'
//       state.error = null
//     },
//     setAuthError(state, action) {
//       state.error = action.payload
//       state.status = 'failed'
//     },
//   },
// })

// export const { setCredentials, clearCredentials, setAuthError } = authSlice.actions

// export default authSlice.reducer

// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {

    try {
  const configured = import.meta.env.VITE_API_BASE_URL || ''
  const normalized = configured.endsWith('/') ? configured.slice(0, -1) : configured
  const apiRoot = normalized ? `${normalized}/api/v1/user` : '/api/v1/user'
  const loginUrl = apiRoot.endsWith('/') ? `${apiRoot}login` : `${apiRoot}/login`
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return rejectWithValue(data.message || 'Invalid credentials');
      }

      // Save tokens locally
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem(
        'user',
        JSON.stringify({
          full_name: data.full_name,
          email: data.email,
          is_superuser: data.is_superuser,
        })
      );

      return data;
    } catch (err) {
      return rejectWithValue('Server error, please try again later.');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          full_name: action.payload.full_name,
          email: action.payload.email,
          is_superuser: action.payload.is_superuser,
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

