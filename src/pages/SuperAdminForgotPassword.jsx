import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import signinImg from "../../assets/sign-in.jpg";

export default function SuperAdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const navigate = useNavigate();

  const handleSendResetLink = () => {
    setError("");
    setSuccess(false);
      setShowModal(true);


    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Fake success simulation
    setSuccess(true);

    // In real world: call backend API to send reset link
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="min-h-screen bg-white flex items-center justify-center flex-1 p-8 relative">
        {/* Top Left Status
        <div className="absolute top-4 left-4 text-gray-400 text-xs">
          {error && "Error sending reset link"}
          {success && "Reset link sent successfully"}
          {!error && !success && "Forgot password"}
        </div> */}

        {/* Card */}
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm">
              Provide your email address to reset your account password.
            </p>
          </div>

          {/* Error or Success Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-sm">
                A reset link has been sent to your email.
              </p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Write here"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  email
                    ? "border-gray-300 bg-gray-50 focus:ring-purple-500 focus:border-transparent"
                    : "border-gray-300 bg-white focus:ring-purple-500 focus:border-transparent"
                }`}
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              onClick={handleSendResetLink}
              className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
                !email
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-700 text-white hover:bg-purple-800"
              }`}
              disabled={!email}
            >
              Send Reset Link
            </button>

            {/* Footer Link */}
            <div className="text-center text-sm text-gray-700">
              Remember your password?{" "}
              <Link
                to="/superadmin/login"
                className="text-[#C24C99] font-medium hover:underline"
              >
                Login to Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 border border-blue-400 relative">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              A password reset link has been sent to your email <br />
              <span className="font-medium text-purple-700">
                {email || "john.doe@gmail.com"}
              </span>
              . Click on the link provided in the email to reset your account
              password.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Close
              </button>
            </div>

            {/* Optional close "X" button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
