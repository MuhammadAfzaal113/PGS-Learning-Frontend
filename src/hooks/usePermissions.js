import { useSelector } from 'react-redux'
import { hasPermission } from '../utils/rbac'

export function usePermissions() {
  const user = useSelector((s) => s.auth.user)

  function can(permission, opts = {}) {
    return hasPermission(user, permission, opts)
  }

  return { user, can }
}

export default usePermissions
