import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // Use VITE_API_BASE_URL and append the API root path `/api/v1/user`
    baseUrl: (() => {
      const base = import.meta.env.VITE_API_BASE_URL || ''
      // normalize base and append api root
      const normalized = base.endsWith('/') ? base.slice(0, -1) : base
      return normalized ? `${normalized}/api/v1/user` : '/api/v1/user'
    })(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default api
