import React from 'react';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import Login from '../components/teacherAdminAuth/Login'
import Signup from '../components/teacherAdminAuth/Signup'
import ForgotPassword from '../components/teacherAdminAuth/ForgotPassword'
import Profile from '../pages/Profile'
import ProjectPage from '../pages/ProjectPage'
import Courses from '../pages/course/Courses'
import Payments from '../pages/Payments'
import Reviews from '../pages/rating-and-reviews/Reviews'
import Permissions from '../pages/permission/Permission'
import TeacherSettings from '../pages/TeacherSettings'
import ViewCourse from '../pages/ViewCourse'
import Dashboard from '../pages/Dashboard'
import Layouts from '../components/layouts/Layout'
import AddCourse from '../pages/course/add-course-form/AddCourse'
import Quizzes from '../pages/quiz/Quizzes'
import CreateQuiz from '../pages/quiz/create-quiz-form/CreateQuiz'
import QuizDetail from '../pages/quiz/quiz-detail/QuizDetail'
import PaymentInvoice from '../components/teacher/PaymentInvoice'
import Students from '../pages/students/Students'
import Team from '../pages/my-team/Team'
import AddTeamMemberPage from '../pages/AddTeamMemberPage'
import SuperAdminLogin from '../pages/SuperAdminLogin'
import SuperAdminDashboard from '../pages/SuperAdminDashboard'
import SuperAdminForgotPassword from '../pages/SuperAdminForgotPassword'
import AddInstitute from '../components/superadmin/institutes/institute-add-form/AddInstitute'
import InstituteDetails from '../components/superadmin/institutes/institute-detail/InstituteDetails'
import AddTeacher from '../components/superadmin/teachers/add-teacher-form/AddTeacher'
import { Institutes, Subscriptions, Teachers } from '../components/superadmin';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Super Admin */}
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/forgot-password" element={<SuperAdminForgotPassword />} />
      <Route element={<ProtectedRoute requiredRole="super_admin" />}>
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
        {/* <Route path="/superadmin/institutes/:id" element={<InstituteDetails />} /> */}
      </Route>
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
      <Route element={<Layouts />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/institutes" element={<Institutes />} />
        <Route path="/superadmin/institutes/add" element={<AddInstitute />} />
  <Route path="/superadmin/institutes/:id" element={<InstituteDetails />} />
  <Route path="/teachers" element={<Teachers />} />
  <Route path="/teachers/add" element={<AddTeacher />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/teacher/courses/add" element={<AddCourse />} />
        <Route path="/teacher/courses/:id" element={<ViewCourse />} />
        <Route path="/quizes" element={<Quizzes />} />
        <Route path="/teacher/quizes/create" element={<CreateQuiz />} />
        <Route path="/teacher/quizes/detail" element={<QuizDetail />} />
        <Route path="/students" element={<Students />} />
        <Route path="/my_team" element={<Team />} />
        <Route path="/teacher/my_team/add" element={<AddTeamMemberPage />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/teacher/payments/invoice" element={<PaymentInvoice />} />
        <Route path="/rating_and_reviews" element={<Reviews />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/settings" element={<PaymentInvoice />} />
      </Route>
      {/* </Route> */}
    </Routes>
  )
}
