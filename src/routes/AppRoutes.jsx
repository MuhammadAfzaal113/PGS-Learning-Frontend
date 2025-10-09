import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import Profile from '../pages/Profile'
import ProjectPage from '../pages/ProjectPage'

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
    </Routes>
  )
}
