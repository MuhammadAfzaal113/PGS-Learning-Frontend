import React from 'react';

const TeacherTeam = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Team</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Team Members</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Member
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Team Member Card */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                👤
              </div>
              <div>
                <h3 className="font-medium">Jane Smith</h3>
                <p className="text-sm text-gray-600">Assistant Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTeam;