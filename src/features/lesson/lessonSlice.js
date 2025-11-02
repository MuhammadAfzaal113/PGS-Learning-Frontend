import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createLesson,
  listLessons,
  updateLesson,
  deleteLesson,
} from '../../api/axiosClient' // adjust path if needed

// --- Async Thunks ---

export const fetchLessons = createAsyncThunk(
  'lessons/list',
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const data = await listLessons(courseId)
      console.log('Fetched lessons data:', data)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const addLesson = createAsyncThunk(
  'lessons/addLesson',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createLesson(formData)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const editLesson = createAsyncThunk(
  'lessons/editLesson',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await updateLesson(payload)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const removeLesson = createAsyncThunk(
  'lessons/removeLesson',
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteLesson(id)
      return { id, ...data }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// --- Slice ---
const lessonSlice = createSlice({
  name: 'lessons',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch lessons
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload || []
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch lessons'
      })

      // Add lesson
      .addCase(addLesson.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loading = false
        const newLesson = action.payload?.lesson || action.payload

        // ✅ Handle invalid or empty payload
        if (!newLesson || Object.keys(newLesson).length === 0) {
          state.error = 'Failed to add lesson: Empty or invalid payload.'
          return
        }

        // ✅ Ensure state.items is always an array
        if (!Array.isArray(state.items)) {
          state.items = []
        }

        state.items.unshift(newLesson)
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to add lesson'
      })

      // Edit lesson
      .addCase(editLesson.pending, (state) => {
        state.loading = true
      })
      .addCase(editLesson.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex(
          (l) => l.id === action.payload?.lesson?.id
        )
        if (index !== -1) state.items[index] = action.payload.lesson
      })
      .addCase(editLesson.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to edit lesson'
      })

      // Delete lesson
      .addCase(removeLesson.fulfilled, (state, action) => {
        state.items = state.items.filter((l) => l.id !== action.payload.id)
      })
      .addCase(removeLesson.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to delete lesson'
      })
  },
})

export default lessonSlice.reducer
