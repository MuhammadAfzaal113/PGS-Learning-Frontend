import React, { useState } from 'react'
import { forgotPassword } from '../../api/axiosClient'

export default function ForgotPasswordApi() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setError(null)
    if (!email) return setError('Please enter your email')
    setLoading(true)
    try {
      const data = await forgotPassword(email)
      setMessage(data.message || 'If this email exists, a reset link has been sent')
      setEmail('')
    } catch (err) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Forgot Password (API)</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset'}
          </button>
        </div>
      </form>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  )
}
