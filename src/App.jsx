import React from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { clearCredentials } from './features/auth/authSlice'
import { Link } from 'react-router-dom'

function App() {
  const user = useSelector((s) => s.auth.user)
  const dispatch = useDispatch()

  return (
    <div>
      {/* <header style={{ display: 'flex', gap: 12, padding: 12, alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>LMS</h1>
        <nav style={{ marginLeft: 12 }}>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/projects/p1">Project p1</Link>
        </nav>
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <>
              <span style={{ marginRight: 8 }}>{user.name}</span>
              <button onClick={() => dispatch(clearCredentials())}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header> */}

      <main>
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
