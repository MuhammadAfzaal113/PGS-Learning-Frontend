import React from 'react'
import { Institutes, Subscriptions, Teachers } from '../components/superadmin'

export default function SuperAdminDashboard() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
      <p className="text-gray-600">Welcome to the super-admin console. Use the panels below to manage the platform.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <Institutes /> */}
        <Subscriptions />
        <Teachers />
      </div>
    </div>
  )
}
