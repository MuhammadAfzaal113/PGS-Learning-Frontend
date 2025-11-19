import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createLesson,
  listLessons,
  updateLesson,
  deleteLesson,
} from '../../api/axiosClient'

// ─────────────────────────────────────────────
// 🔥 ASYNC THUNKS
// ─────────────────────────────────────────────

// Fetch Lessons
export const fetchLessons = createAsyncThunk(
  'lessons/fetchAll',
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const res = await listLessons(courseId)
      return res || []
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Add Lesson
export const addLesson = createAsyncThunk(
  'lessons/add',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createLesson(formData)
      return res?.lesson || res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Edit Lesson
export const editLesson = createAsyncThunk(
  'lessons/edit',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateLesson(payload)
      return res?.lesson || res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Delete Lesson
export const removeLesson = createAsyncThunk(
  'lessons/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteLesson(id)
      return id
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// ─────────────────────────────────────────────
// 🧩 INITIAL STATE
// ─────────────────────────────────────────────

const initialState = {
  items: [],
  loading: false,
  error: null,
}

// ─────────────────────────────────────────────
// 🧠 SLICE
// ─────────────────────────────────────────────

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ─────────────────────────────────────────────
      // 📌 FETCH LESSONS
      // ─────────────────────────────────────────────
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
        state.error =
          action.payload?.message || 'Failed to load lessons.'
      })

      // ─────────────────────────────────────────────
      // 📌 ADD LESSON
      // ─────────────────────────────────────────────
      .addCase(addLesson.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loading = false
        const lesson = action.payload

        if (!lesson || typeof lesson !== 'object') {
          state.error = 'Invalid lesson data returned.'
          return
        }

        state.items.unshift(lesson)
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to add lesson.'
      })

      // ─────────────────────────────────────────────
      // 📌 EDIT LESSON
      // ─────────────────────────────────────────────
      .addCase(editLesson.pending, (state) => {
        state.loading = true
      })
      .addCase(editLesson.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload
        const index = state.items.findIndex(
          (l) => l.id === updated?.id
        )
        if (index !== -1) {
          state.items[index] = updated
        }
      })
      .addCase(editLesson.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to edit lesson.'
      })

      // ─────────────────────────────────────────────
      // 📌 DELETE LESSON
      // ─────────────────────────────────────────────
      .addCase(removeLesson.fulfilled, (state, action) => {
        state.items = state.items.filter((l) => l.id !== action.payload)
      })
      .addCase(removeLesson.rejected, (state, action) => {
        state.error =
          action.payload?.message || 'Failed to delete lesson.'
      })
  },
})

export default lessonSlice.reducer
