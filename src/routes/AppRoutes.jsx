import React from 'react';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import Profile from '../pages/Profile'
import ProjectPage from '../pages/ProjectPage'
import TeacherCourses from '../pages/TeacherCourses'
import TeacherPayments from '../pages/TeacherPayments'
import TeacherReviews from '../pages/TeacherReviews'
import TeacherPermissions from '../pages/TeacherPermission'
import TeacherSettings from '../pages/TeacherSettings'
import ViewCourse from '../pages/ViewCourse'
import TeacherDashboard from '../pages/TeacherDashboard'
import TeacherLayouts from '../components/layouts/TeacherLayout'
import AddCourse from '../pages/AddCourse'
import TeacherQuizzes from '../pages/TeacherQuizzes'
import CreateQuiz from '../pages/CreateQuiz'
import QuizDetail from '../pages/QuizDetail'
import PaymentInvoice from '../components/teacher/PaymentInvoice'
import TeacherStudents from '../pages/TeacherStudents'
import TeacherTeam from '../pages/TeacherTeam'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<ProtectedRoute requiredPermission="project:view" />}>
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Route>
       {/* Teacher Routes */}
      {/* <Route element={<ProtectedRoute requiredPermission="teacher:access" />}> */}
        <Route element={<TeacherLayouts />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/courses" element={<TeacherCourses />} />
          <Route path="/teacher/courses/add" element={<AddCourse />} />
          <Route path="/teacher/courses/:id" element={<ViewCourse />} />
          <Route path="/teacher/quizes" element={<TeacherQuizzes />} />
          <Route path="/teacher/quizes/create" element={<CreateQuiz />} />
          <Route path="/teacher/quizes/detail" element={<QuizDetail />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/my_team" element={<TeacherTeam />} />
          <Route path="/teacher/payments" element={<TeacherPayments />} />
          <Route path="/teacher/payments/invoice" element={<PaymentInvoice />} />
          <Route path="/teacher/rating_and_reviews" element={<TeacherReviews />} />
          <Route path="/teacher/permissions" element={<TeacherPermissions />} />
          <Route path="/teacher/settings" element={<PaymentInvoice />} />
        </Route>
      {/* </Route> */}
    </Routes>
  )
}
