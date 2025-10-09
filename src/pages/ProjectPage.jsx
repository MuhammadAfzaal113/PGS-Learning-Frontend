import React from 'react'
import { useParams } from 'react-router-dom'
import usePermissions from '../hooks/usePermissions'
import { PERMISSIONS } from '../utils/rbac'

export default function ProjectPage() {
  const { id } = useParams()
  const { user, can } = usePermissions()

  return (
    <div style={{ padding: 20 }}>
      <h2>Project {id}</h2>
      <p>Current user: {user ? user.name : 'Guest'}</p>
      <p>Can create content: {can(PERMISSIONS.CONTENT_CREATE, { projectId: id }) ? 'Yes' : 'No'}</p>
    </div>
  )
}
