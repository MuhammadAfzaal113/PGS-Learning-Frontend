import React from 'react';

const TeacherPermissions = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Permissions</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Team Permissions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Course Management</h3>
                  <p className="text-sm text-gray-600">Ability to create and edit courses</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked readOnly />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Student Management</h3>
                  <p className="text-sm text-gray-600">Access to student information and enrollment</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked readOnly />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Role Management</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Assistant Teacher</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Can view and grade assignments, but cannot modify course content
                </p>
                <button className="mt-2 text-blue-500 hover:text-blue-700">
                  Edit Permissions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherPermissions;