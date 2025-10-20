import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import signinImg from '../../assets/sign-in.jpg'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const DEFAULT_EMAIL = 'teacher@gmail.com';
  const DEFAULT_PASSWORD = 'teacher';

  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // If a user is already stored and has role 'teacher', redirect to dashboard
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored && stored.role === 'teacher') {
          navigate('/dashboard');
        }
      }
    } catch (e) {
      // ignore parse/storage errors
    }
  }, [navigate]);

  // Show an error message if user edits the prefilled credentials
  useEffect(() => {
    if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
      setError('You modified the prefilled credentials. Please verify email and password before logging in.');
    } else {
      setError('');
    }
  }, [email, password]);

  const handleLogin = () => {
    setError('');

    if (!email || !password) {
      setError('The password entered does not match the user account or the account does not exist. Please verify both and try again.');
      return;
    }

    // Persist user data to localStorage with role 'teacher'
    try {
      const user = { email, role: 'teacher' };
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      // ignore storage errors
      console.warn('Failed to save user to localStorage', e);
    }

    // Optionally navigate to teacher dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2  items-center justify-center ">
        <div className="relative w-full h-full max-w-2xl">
          <img
            src={signinImg}
            alt="Learning team"
            className="w-full h-full object-cover rounded-[2.75rem] p-5"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Login to Your Learnings
            </h1>
            <p className="text-gray-600">
              A global learning platform where you can discover and buy your required courses with ease.
            </p>
          </div>

          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Write here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-red-600 hover:text-red-700 font-medium">
                Forgot Password?
              </Link>
            </div>
            <button
              onClick={handleLogin}
              disabled={!email || !password}
              className={`w-full py-3 rounded-lg font-medium transition duration-200 
                ${!email || !password
                  ? 'bg-gray-300 text-white cursor-not-allowed'
                  : 'bg-[#664286] hover:bg-[#664286] text-white'
                }`}
            >
              Login to Account
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#C24C99] hover:text-[#C24C99] font-medium">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
