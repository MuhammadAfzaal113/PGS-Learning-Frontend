import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-lg text-center bg-white p-8 rounded-lg shadow">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <p className="text-sm text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
