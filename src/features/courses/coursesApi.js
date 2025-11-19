// src/redux/slices/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { protectedAPI } from "../../api/axiosClient";

// --- Async Thunks ---

export const fetchCourses = createAsyncThunk(
  'courses/list',
  async ({ index = 0, offset = 10 }, { rejectWithValue }) => {
    try {
      const data = await protectedAPI.listCourses({ index, offset });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addCourse = createAsyncThunk(
  'courses/addCourse',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await protectedAPI.createCourse(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editCourse = createAsyncThunk(
  'courses/editCourse',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await protectedAPI.updateCourse(payload);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeCourse = createAsyncThunk(
  'courses/removeCourse',
  async (id, { rejectWithValue }) => {
    try {
      const data = await protectedAPI.deleteCourse(id);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


// --- Slice ---
const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload || []
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch courses'
      })

  // Add course
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        const newCourse = action.payload?.course || action.payload;

        // ✅ Handle invalid or empty payload
        if (!newCourse || Object.keys(newCourse).length === 0) {
          state.error = 'Failed to add course: Empty or invalid payload.';
          return;
        }

        // ✅ Make sure state.items is always an array
        if (!Array.isArray(state.items)) {
          state.items = [];
        }

        state.items.unshift(newCourse);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to add course';
      })
      
      // Edit course
      .addCase(editCourse.pending, (state) => {
        state.loading = true
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex(c => c.id === action.payload?.course?.id)
        if (index !== -1) state.items[index] = action.payload.course
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to edit course'
      })

      // Delete course
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload.id)
      })
      .addCase(removeCourse.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to delete course'
      })
  },
})

export default courseSlice.reducer
