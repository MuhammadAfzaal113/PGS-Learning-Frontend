import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  // createQuiz,
  // listQuizzes,
  // createQuestion,
  // listQuestions,
} from '../../api/axiosClient'

// ─────────────────────────────────────────────
// 🔥 ASYNC THUNKS
// ─────────────────────────────────────────────

// Fetch quizzes for a lesson
export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchAll',
  async ({ lessonId, index = 0, offset = 10 }, { rejectWithValue }) => {
    try {
      const res = await listQuizzes({ lessonId, index, offset })
      return res || []
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Add a new quiz
export const addQuiz = createAsyncThunk(
  'quiz/add',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createQuiz(formData)
      return res?.quiz || res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// Add a quiz question
// export const addQuestion = createAsyncThunk(
//   'quiz/addQuestion',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await createQuestion(formData)
//       return res
//     } catch (err) {
//       return rejectWithValue(err)
//     }
//   }
// )

// Fetch questions for a specific quiz
export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async (quizId, { rejectWithValue }) => {
    try {
      const res = await listQuestions(quizId)
      return { quizId, questions: res || [] }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

// ─────────────────────────────────────────────
// 🧩 INITIAL STATE
// ─────────────────────────────────────────────

const initialState = {
  quizzes: [],
  questions: {}, // keyed by quizId
  loading: false,
  error: null,
}

// ─────────────────────────────────────────────
// 🧠 SLICE
// ─────────────────────────────────────────────

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ─────────────────────────────────────────────
      // 📌 FETCH QUIZZES
      // ─────────────────────────────────────────────
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
        state.error =
          action.payload?.message || 'Failed to fetch quizzes.'
      })

      // ─────────────────────────────────────────────
      // 📌 ADD QUIZ
      // ─────────────────────────────────────────────
      .addCase(addQuiz.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.loading = false
        const quiz = action.payload
        if (quiz && typeof quiz === 'object') {
          state.quizzes.unshift(quiz)
        } else {
          state.error = 'Invalid quiz data returned.'
        }
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to add quiz.'
      })

      // ─────────────────────────────────────────────
      // 📌 ADD QUESTION
      // ─────────────────────────────────────────────
      .addCase(addQuestion.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false
        const q = action.payload
        if (q?.quiz) {
          if (!state.questions[q.quiz]) state.questions[q.quiz] = []
          state.questions[q.quiz].push(q)
        }
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to add question.'
      })

      // ─────────────────────────────────────────────
      // 📌 FETCH QUESTIONS
      // ─────────────────────────────────────────────
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false
        const { quizId, questions } = action.payload
        state.questions[quizId] = questions || []
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Failed to fetch questions.'
      })
  },
})

export default quizSlice.reducer
