import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { refreshAuth } from '../../api/axiosClient'

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
      console.log('Login successful, received data:', data);
      // Save tokens locally
      localStorage.setItem('accessToken', data?.data?.accessToken);
      localStorage.setItem('refreshToken', data?.data?.refreshToken);
      localStorage.setItem(
        'user',
        JSON.stringify({
          full_name: data?.data?.full_name,
          email: data?.data?.email,
          is_superuser: data?.data?.is_superuser,
        })
      );

      return data;
    } catch (err) {
      return rejectWithValue('Server error, please try again later.');
    }
  }
);

// ✅ Async thunk to refresh access token
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async ({ refreshToken }, { rejectWithValue }) => {
    try {
      const data = await refreshAuth(refreshToken)
      if (!data || !data.success) return rejectWithValue(data.message || 'Refresh failed')
      // persist tokens
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return data
    } catch (err) {
      return rejectWithValue(err.message || 'Refresh token failed')
    }
  }
)

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
      })
      // refresh token flow
      .addCase(refreshAccessToken.pending, (state) => {
        // keep UI loading unaffected; just clear error
        state.error = null
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        // failed refresh — clear auth state
        state.accessToken = null
        state.refreshToken = null
        state.user = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        state.error = action.payload || 'Session expired'
      })
    ;
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

