import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// --------------------------------------------------
// 1️⃣ Base Query (attach token)
// --------------------------------------------------
const baseQuery = fetchBaseQuery({
  baseUrl: (() => {
    const base = import.meta.env.VITE_API_BASE_URL || "";
    const normalized = base.endsWith("/") ? base.slice(0, -1) : base;
    return normalized ? `${normalized}/api/v1` : "/api/v1";
  })(),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

// --------------------------------------------------
// 2️⃣ Base Query With RE-AUTH (Refresh Token Handler)
// --------------------------------------------------
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if 401 → try refresh
  if (result.error?.status === 401) {
    const refreshToken = api.getState().auth.refreshToken;

    if (!refreshToken) {
      return result; // cannot refresh → return original error
    }

    // Try to refresh token
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      // Save refreshed tokens
      api.dispatch({
        type: "auth/refreshAccessToken/fulfilled",
        payload: refreshResult.data,
      });

      // Retry original API call
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed → Log out user
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

// --------------------------------------------------
// 3️⃣ Final RTK Query API using baseQueryWithReauth
// --------------------------------------------------
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
