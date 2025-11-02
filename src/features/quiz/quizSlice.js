import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createQuiz,
  listQuizzes,
  createQuestion,
  listQuestions,
} from '../../api/axiosClient'

// --- Async Thunks ---

// Fetch quizzes for a specific lesson
export const fetchQuizzes = createAsyncThunk(
  'quiz/list',
  async ({ lessonId, index = 0, offset = 10 }, { rejectWithValue }) => {
    try {
      const data = await listQuizzes({ lessonId, index, offset })
      console.log('Fetched quizzes data:', data)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Add a new quiz
export const addQuiz = createAsyncThunk(
  'quiz/addQuiz',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createQuiz(formData)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Add a quiz question
export const addQuestion = createAsyncThunk(
  'quiz/addQuestion',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createQuestion(formData)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Get quiz questions
export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (quizId, { rejectWithValue }) => {
    try {
      const data = await listQuestions(quizId)
      return { quizId, questions: data }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// --- Slice ---
const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizzes: [],
    questions: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false
        state.quizzes = action.payload || []
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch quizzes'
      })

      // Add quiz
      .addCase(addQuiz.pending, (state) => {
        state.loading = true
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.loading = false
        state.quizzes.unshift(action.payload?.quiz || action.payload)
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to add quiz'
      })

      // Add question
      .addCase(addQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false
        const q = action.payload
        if (q.quiz) {
          if (!state.questions[q.quiz]) state.questions[q.quiz] = []
          state.questions[q.quiz].push(q)
        }
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to add question'
      })

      // Fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false
        state.questions[action.payload.quizId] = action.payload.questions
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch questions'
      })
  },
})

export default quizSlice.reducer
