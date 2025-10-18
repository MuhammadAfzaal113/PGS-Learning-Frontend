import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ requiredPermission, projectId, requiredRole }) {
  const user = useSelector((s) => s.auth.user)

  if (!user) return <Navigate to="/login" replace />

  // role-based guard (global roles only)
  if (requiredRole) {
    const globalRoles = user.globalRoles || []
    if (!globalRoles.includes(requiredRole)) {
      return <div style={{ padding: 20 }}>403 — Forbidden</div>
    }
  }

  if (requiredPermission) {
    // lazy check: user must have permission in frontend; use server for real enforcement
    const { hasPermission } = require('../utils/rbac')
    if (!hasPermission(user, requiredPermission, { projectId })) {
      return <div style={{ padding: 20 }}>403 — Forbidden</div>
    }
  }

  return <Outlet />
}
