import axios from 'axios'

// Build API root using VITE_API_BASE_URL and append /api/v1/user (same convention used elsewhere)
// Use Vite env (import.meta.env) — `process` is not available in the browser build.
const configured = import.meta.env.VITE_API_BASE_URL || ''
const normalized = configured.endsWith('/') ? configured.slice(0, -1) : configured
const apiRoot = normalized ? `${normalized}/api/v1/user` : '/api/v1/user'

// ✅ Base URL for courses
const courseRoot = normalized ? `${normalized}/api/v1/courses/courses` : '/api/v1/courses/courses'

const axiosInstance = axios.create({
  baseURL: apiRoot,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

// Attach token automatically if stored in localStorage
axiosInstance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (e) {
    // ignore
  }
  return config
})

// -----------------------------
// Automatic refresh on 401
// -----------------------------
let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

// Response interceptor for the global axios instance to handle 401s
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    const status = error.response ? error.response.status : null
    // If 401 (Unauthorized) attempt refresh once
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // If already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            if (!token) return reject(error)
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(axios(originalRequest))
          })
        })
      }

      isRefreshing = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          // no refresh token, clear storage and reject
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          isRefreshing = false
          onRefreshed(null)
          return Promise.reject(error)
        }

        // Call refresh endpoint using axiosInstance (base api/v1/user)
        const resp = await axiosInstance.post('/refresh', { refresh_token: refreshToken })
        const data = resp.data
        if (data && data.accessToken) {
          // persist tokens
          try {
            localStorage.setItem('accessToken', data.accessToken)
            if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
          } catch (e) {
            // ignore storage errors
          }

          // update default headers for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`

          isRefreshing = false
          onRefreshed(data.accessToken)

          // retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          return axios(originalRequest)
        }

        // if refresh failed
        isRefreshing = false
        onRefreshed(null)
        return Promise.reject(error)
      } catch (refreshErr) {
        isRefreshing = false
        try { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); localStorage.removeItem('user') } catch (e) {}
        onRefreshed(null)
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(error)
  }
)

// ─────────────────────────────────────────────
// ✅ AUTH APIs
// ─────────────────────────────────────────────

export async function forgotPassword(email) {
  try {
    const res = await axiosInstance.post('/forgot-password', { email })
    return res.data
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data
    throw { message: err.message || 'Network error' }
  }
}

export async function refreshAuth(refreshToken) {
  try {
    const res = await axiosInstance.post('/refresh', { refresh_token: refreshToken })
    return res.data
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data
    throw { message: err.message || 'Network error' }
  }
}

// ─────────────────────────────────────────────
// ✅ COURSE CRUD APIs
// ─────────────────────────────────────────────

// Create Course (multipart/form-data)
export async function createCourse(formData) {
  try {
    const token = localStorage.getItem('accessToken')
    const res = await axios.post(`${courseRoot}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data
    throw { message: err.message || 'Network error' }
  }
}

// List Courses
// Accepts either (index, offset) or a single object { index, offset }
export async function listCourses(a = 0, b = 10) {
  // normalize params
  let index, offset
  if (typeof a === 'object' && a !== null) {
    index = a.index ?? 0
    offset = a.offset ?? 10
  } else {
    index = a ?? 0
    offset = b ?? 10
  }

  console.log('Listing courses', { courseRoot, index, offset })

  try {
    const token = localStorage.getItem('accessToken')
    const res = await axios.get(`${courseRoot}/list`, {
      params: { index, offset },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('Courses listed', res.data.results)
    return res.data.results
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data
    throw { message: err.message || 'Network error' }
  }
}

// Update Course
export async function updateCourse(courseData) {
  try {
    const token = localStorage.getItem('accessToken')
    const res = await axios.put(`${courseRoot}/update`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data
    throw { message: err.message || 'Network error' }
  }
}

// Delete Course
export async function deleteCourse(courseId) {
  try {
    const token = localStorage.getItem('accessToken')
    const res = await axios.delete(`${courseRoot}/delete/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data
    throw { message: err.message || 'Network error' }
  }
}

export default axiosInstance
