// ============================================================================
// 🌐 AXIOS CLIENT — SINGLE INSTANCE (Public + Authorized Sections)
// DRY | Refresh Token | Auto Attach Token | No Redundant Headers
// ============================================================================

import axios from "axios";

// -------------------------------------------
// 🌐 BASE URL CONFIGURATION
// -------------------------------------------
const BASE = import.meta.env.VITE_API_BASE_URL || "";
const normalized = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;

export const API_ROOT = normalized ? `${normalized}/api/v1` : "/api/v1";

// -------------------------------------------
// 🚀 CREATE MAIN AXIOS INSTANCE
// -------------------------------------------
const api = axios.create({
  baseURL: API_ROOT,
  timeout: 15000,
});

// -------------------------------------------
// 🔐 REQUEST INTERCEPTOR — AUTO ATTACH TOKEN
// -------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================================
// 🔄 AUTO TOKEN REFRESH — GLOBAL RESPONSE INTERCEPTOR
// ============================================================================
let isRefreshing = false;
let subscribers = [];

function subscribe(cb) {
  subscribers.push(cb);
}
function notifySubscribers(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (!original) return Promise.reject(error);

    const status = error.response?.status;

    // Refresh only on 401
    if (status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(error);

      // Queue requests while refreshing
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribe((newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const resp = await api.post("/user/refresh", {
          refresh_token: refreshToken,
        });

        const { accessToken, refreshToken: newRefresh } = resp.data;

        // store tokens
        localStorage.setItem("accessToken", accessToken);
        if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

        isRefreshing = false;
        notifySubscribers(accessToken);

        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (err) {
        isRefreshing = false;
        notifySubscribers(null);
        localStorage.clear();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ============================================================================
// ⚡ UTILITY WRAPPER (Optional)
// Makes api.get/api.post cleaner + auto error extraction
// ============================================================================

export const request = {
  get: async (url, config = {}) => {
    try {
      const res = await api.get(url, config);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: err.message };
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const res = await api.post(url, data, config);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: err.message };
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const res = await api.put(url, data, config);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: err.message };
    }
  },

  del: async (url, config = {}) => {
    try {
      const res = await api.delete(url, config);
      return res.data;
    } catch (err) {
      throw err.response?.data || { message: err.message };
    }
  },
};

// ============================================================================
// 📌 PUBLIC ENDPOINTS (NO TOKEN REQUIRED)
// Components & RTK can use these
// ============================================================================
export const publicAPI = {
  forgotPassword: (email) =>
    request.post("/user/forgot-password", { email }),

  sendOtp: (email) =>
    request.post("/user/send-otp", { email }),
};

// ============================================================================
// 🔐 AUTHORIZED ENDPOINTS (TOKEN REQUIRED)
// BOTH — Components & RTK Query can reuse these
// ============================================================================
export const protectedAPI = {
  // -------------------------
  // USER
  // -------------------------
  refresh: (refresh_token) =>
    request.post("/user/refresh", { refresh_token }),

  // -------------------------
  // COURSES
  // -------------------------
  listCourses: ({ index = 0, offset = 10 }) =>
    request.get("/courses/courses/list", { params: { index, offset } }),

  createCourse: (formData) =>
    request.post("/courses/courses/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateCourse: (data) =>
    request.put("/courses/courses/update", data),

  deleteCourse: (courseId) =>
    request.del(`/courses/courses/delete/${courseId}`),

  // -------------------------
  // LESSONS
  // -------------------------
  listLessons: (courseId) =>
    request.get("/courses/lessons/list", {
      params: { course_id: courseId },
    }),

  createLesson: (data) =>
    request.post("/courses/lessons/create", data),

  updateLesson: (data) =>
    request.put("/courses/lessons/update", data),

  deleteLesson: (lessonId) =>
    request.del(`/courses/lessons/delete/${lessonId}`),

  // -------------------------
  // QUIZ
  // -------------------------
  listQuizzes: ({ lessonId, index = 0, offset = 10 }) =>
    request.get("/courses/quiz/list", {
      params: { lesson_id: lessonId, index, offset },
    }),

  createQuiz: (data) =>
    request.post("/courses/quiz/create", data),



  // -------------------------
  // TEAM
  // -------------------------
  createTeam: (payload) =>
    request.post("/company/user/create", payload),

  getTeam: ({ index, offset, role }) =>
    request.get("/company/get-user-list", { params: { index, offset, role } }),

  // -------------------------
  // DASHBOARD STATS (NEW)
  // -------------------------
  getDashboardStats: () =>
    request.get("/company/teacher/dashboard-stats"), 

  // -------------------------
  // Students
  // -------------------------
  getStudents: ({ index, offset, role }) =>
    request.get("/company/get-user-list", { params: { index, offset, role } }),

  // -------------------------
  // USER AUTH
  // -------------------------
  authMe: () => request.get("/user/auth/me"),

  // -------------------------
  // STUDENTS
  // -------------------------
  getStudents: ({ index = 0, offset = 10 } = {}) =>
    request.get("/user/get-student-list", {
      params: { index, offset },
    }),

  // -------------------------
  // UPDATE PROFILE
  // -------------------------
  updateUserInfo: (payload) =>
    request.put("/user/update-profile", payload),

};

// Export the axios instance
export default api;
