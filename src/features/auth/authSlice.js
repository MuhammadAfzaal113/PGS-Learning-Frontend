import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.status = 'succeeded'
      state.error = null
    },
    clearCredentials(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.status = 'idle'
      state.error = null
    },
    setAuthError(state, action) {
      state.error = action.payload
      state.status = 'failed'
    },
  },
})

export const { setCredentials, clearCredentials, setAuthError } = authSlice.actions

export default authSlice.reducer
