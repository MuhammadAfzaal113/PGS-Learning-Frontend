import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ requiredPermission, projectId }) {
  const user = useSelector((s) => s.auth.user)

  if (!user) return <Navigate to="/login" replace />

  if (requiredPermission) {
    // lazy check: user must have permission in frontend; use server for real enforcement
    const { hasPermission } = require('../utils/rbac')
    if (!hasPermission(user, requiredPermission, { projectId })) {
      return <div style={{ padding: 20 }}>403 — Forbidden</div>
    }
  }

  return <Outlet />
}
