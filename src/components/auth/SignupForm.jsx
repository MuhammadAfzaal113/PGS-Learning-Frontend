import React from "react";
import signinImg from '../../assets/sign-in.jpg'

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <img
          src={signinImg}
          alt="People using laptop"
          className="rounded-2xl object-cover w-full h-full max-h-[90vh]"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Create New Account!</h2>
            <p className="text-sm text-gray-500 mt-1">
              A global learning platform where you can discover and buy your
              required courses with ease.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2 accent-indigo-600" />
              <span className="text-gray-600">
                I agree with Terms of Services & Privacy Policy
                .
              </span>
            </div>

            <button
              type="button"
              className="w-full bg-gray-300 text-gray-600 font-medium py-2 rounded-md cursor-not-allowed"
            >
              Login to Account
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-[#C24C99] font-medium" onClick={() => window.location.href = '/login'}>
                Login to Your Account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
