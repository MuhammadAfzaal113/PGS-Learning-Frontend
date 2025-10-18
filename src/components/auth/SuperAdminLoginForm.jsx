import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import signinImg from '../../assets/sign-in.jpg';

export default function SuperAdminLoginForm() {
    const DEFAULT_EMAIL = 'superadmin@example.com';
    const DEFAULT_PASSWORD = 'superadmin';

    const [email, setEmail] = useState(DEFAULT_EMAIL);
    const [password, setPassword] = useState(DEFAULT_PASSWORD);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showInfoMessage, setShowInfoMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // try {
        //     const raw = localStorage.getItem('user');
        //     if (raw) {
        //         const stored = JSON.parse(raw);
        //         if (
        //             stored &&
        //             (stored.role === 'super_admin' ||
        //                 (stored.globalRoles && stored.globalRoles.includes('super_admin')))
        //         ) {
        //             navigate('/superadmin/dashboard');
        //         }
        //     }
        // } catch (e) {
        //     console.warn('Failed to parse user from localStorage', e);
        // }
    }, [navigate]);

    useEffect(() => {
        if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
            setError(
                'You modified the prefilled credentials. Please verify email and password before logging in.'
            );
        } else {
            setError('');
        }
    }, [email, password]);

    const handleLogin = () => {
        setError('');
        if (!email || !password) {
            setError(
                'The password entered does not match the user account or the account does not exist. Please verify both and try again.'
            );
            return;
        }

        if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
            setError('Incorrect super admin credentials.');
            return;
        }

        try {
            // store user in localStorage for role-based access
            const user = { email, role: 'super_admin', globalRoles: ['super_admin'] };
            localStorage.setItem('user', JSON.stringify(user));
        } catch (e) {
            console.warn('Failed to save user to localStorage', e);
        }

        navigate('/superadmin/dashboard');
    };

    const handleForgotPassword = () => {
        // navigate to the dedicated superadmin forgot password page
        navigate('/superadmin/forgot-password');
    };

    const isButtonDisabled = !email || !password;

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Login Form */}
            <div className="min-h-screen bg-white flex items-center justify-center flex-1 p-8 relative">
                {/* Top left status text */}
                {/* <div className="absolute top-4 left-4 text-gray-400 text-xs">
                    {error && 'Login error'}
                    {showInfoMessage && 'Login to account (info completed)'}
                    {!error && !showInfoMessage && 'Login to account'}
                </div> */}

                {/* Login Card */}
                <div className="w-full max-w-md">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">
                            Login to Your Learnings
                        </h1>
                        <p className="text-gray-600 text-sm">
                            A global learning platform where you can discover and buy your required courses with ease.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-6">
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
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${email
                                        ? 'border-gray-300 bg-gray-50 focus:ring-purple-500 focus:border-transparent'
                                        : 'border-gray-300 bg-white focus:ring-purple-500 focus:border-transparent'
                                    }`}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition pr-10 ${password
                                            ? 'border-gray-300 bg-gray-50 focus:ring-purple-500 focus:border-transparent'
                                            : 'border-gray-300 bg-white focus:ring-purple-500 focus:border-transparent'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <button
                                onClick={handleForgotPassword}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isButtonDisabled}
                            className={`w-full py-3 rounded-lg font-medium transition duration-200 ${isButtonDisabled
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-purple-700 text-white hover:bg-purple-800'
                                }`}
                        >
                            Login to Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - Optional image */}
            {/* <div className="hidden lg:flex flex-1 bg-gray-100 items-center justify-center">
        <img
          src={signinImg}
          alt="Sign In"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div> */}
        </div>
    );
}
