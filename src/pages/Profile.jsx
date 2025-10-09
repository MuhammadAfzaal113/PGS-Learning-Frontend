import React, { useState } from "react";
// import { Upload, User } from "lucide-react";

export default function Profile() {
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=" mx-auto bg-white  shadow-sm p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Complete Your Profile!
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Please enter the information below to complete your account
              information.
            </p>
          </div>

          <button className="border rounded-full p-2 hover:bg-gray-100">
            {/* <User className="w-5 h-5 text-gray-600" /> */}00
          </button>
        </div>

        {/* Profile Image Upload */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Profile Image
          </h3>
          <div className="flex items-center gap-4">
            <label
              htmlFor="upload-logo"
              className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              {logo ? (
                <img
                  src={logo}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  {/* <Upload className="w-6 h-6 mb-2" /> */} 000
                  <span className="text-sm font-medium">Upload Logo</span>
                </div>
              )}
              <input
                id="upload-logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* General Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            General Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Institute Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institute Name
              </label>
              <input
                type="text"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex gap-2">
              <div className="w-20">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                  <option>+92</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Write here"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Write here"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* City, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                placeholder="Write here"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end">
            <button className="bg-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800 transition">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
