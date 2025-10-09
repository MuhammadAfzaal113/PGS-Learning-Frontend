// Simple RBAC permission map and checker

export const PERMISSIONS = {
  PROJECT_CREATE: 'project:create',
  PROJECT_DELETE: 'project:delete',
  PROJECT_UPDATE: 'project:update',
  PROJECT_VIEW: 'project:view',
  PROJECT_MANAGE_USERS: 'project:manage_users',
  CONTENT_CREATE: 'content:create',
  CONTENT_APPROVE: 'content:approve',
}

// Role -> permissions mapping (global / project scoped)
export const ROLE_PERMISSIONS = {
  super_admin: Object.values(PERMISSIONS),
  project_admin: [
    PERMISSIONS.PROJECT_UPDATE,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.PROJECT_MANAGE_USERS,
    PERMISSIONS.CONTENT_APPROVE,
  ],
  teacher: [PERMISSIONS.CONTENT_CREATE, PERMISSIONS.PROJECT_VIEW],
  student: [PERMISSIONS.PROJECT_VIEW],
}

export function hasPermission(user, permission, { projectId } = {}) {
  if (!user) return false
  // global roles
  const globalRoles = user.globalRoles || []
  for (const r of globalRoles) {
    const perms = ROLE_PERMISSIONS[r]
    if (perms && perms.includes(permission)) return true
  }

  // check project-scoped membership
  const memberships = user.memberships || []
  const membership = memberships.find((m) => m.projectId === projectId)
  if (!membership) return false
  const role = membership.role
  const perms = ROLE_PERMISSIONS[role] || []
  return perms.includes(permission)
}
