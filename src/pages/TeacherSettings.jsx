import React from 'react';

const TeacherSettings = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Display Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Your display name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  rows="3"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive updates about your courses</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked readOnly />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Profile Visibility</h3>
                  <p className="text-sm text-gray-600">Make your profile visible to students</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked readOnly />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;