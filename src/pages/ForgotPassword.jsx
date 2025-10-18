import React, { useState } from "react";
import signinImg from "../assets/sign-in.jpg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSendResetLink = () => {
    if (email.trim() === "") return;
    console.log("Reset link sent to:", email);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="relative w-full h-full max-w-2xl">
          <img
            src={signinImg}
            alt="Learning team"
            className="w-full h-full object-cover rounded-[2.75rem] p-5"
          />
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative z-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm">
              Provide your email address to reset your account password.
            </p>
          </div>

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
                placeholder="Write your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              onClick={handleSendResetLink}
              className="w-full bg-purple-700 text-white py-3 rounded-lg font-medium hover:bg-purple-800 transition duration-200"
            >
              Send Reset Link
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <button className="text-[#C24C99] hover:underline font-medium" onClick={() => window.location.href = '/login'}>
                Login to Account
              </button>
            </p>
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
