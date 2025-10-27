import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from '../features/auth/authSlice'
import courseReducer  from '../features/courses/coursesApi'
import { api } from '../api/apiClient'

export const store = configureStore({
  reducer: {
  auth: authReducer,
  courses: courseReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export default store
