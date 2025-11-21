import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { protectedAPI } from "../../api/axiosClient";

// -------------------------------
// LOGIN
// -------------------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL || "";
      const normalized = base.endsWith("/") ? base.slice(0, -1) : base;
      const apiRoot = normalized ? `${normalized}/api/v1/user` : "/api/v1/user";
      const loginUrl = apiRoot.endsWith("/") ? `${apiRoot}login` : `${apiRoot}/login`;

      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Invalid credentials");
      }

      // Save tokens
      localStorage.setItem("accessToken", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);

      return data.data;
    } catch (error) {
      return rejectWithValue("Server error, please try again later.");
    }
  }
);

// -------------------------------
// FETCH AUTH USER (auth/me)
// -------------------------------
export const AuthMe = createAsyncThunk(
  "auth/authMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.authMe();
      if (!response.data) return rejectWithValue("Unable to fetch user");

      return response.data; // full user data
    } catch (err) {
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

// -------------------------------
// REFRESH TOKEN
// -------------------------------
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async ({ refreshToken }, { rejectWithValue }) => {
    try {
      const data = await refreshAuth(refreshToken);

      if (!data || !data.success)
        return rejectWithValue(data.message || "Refresh failed");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Refresh token failed");
    }
  }
);

// -------------------------------
// INITIAL STATE
// -------------------------------
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  tenant: JSON.parse(localStorage.getItem("tenant")) || null,
  role: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

// -------------------------------
// SLICE
// -------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------------------
      // LOGIN
      // -------------------------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        // Save minimal info until authMe fetches full profile
        state.user = {
          full_name: action.payload.full_name,
          email: action.payload.email,
          is_superuser: action.payload.is_superuser,
        };
        localStorage.setItem(
          "user",
          JSON.stringify({
            full_name: action.payload.full_name,
            email: action.payload.email,
            is_superuser: action.payload.is_superuser,
          })
        );
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // -------------------------------
      // FETCH AUTH USER
      // -------------------------------
      .addCase(AuthMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(AuthMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.tenant = action.payload.tenant;
        state.role = action.payload.user?.user_role || null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("tenant", JSON.stringify(action.payload.tenant));
      })
      .addCase(AuthMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------------
      // REFRESH FLOW
      // -------------------------------
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.role = null;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        state.error = action.payload || "Session expired";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
