import React from 'react';

const TeacherTeam = () => {
  return (
        <div className='p-4'>

    <div className="bg-white min-h-screen rounded-lg shadow p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-6">My Team</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="search"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Sort by ▼
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Status ▼
          </button>
          <button className="px-4 py-2 bg-[#664286] text-white rounded-lg hover:bg-[#7A4B9D]">
            Add Team Member
          </button>
        </div>
      </div>

      {/* Centered Message */}
       <div className="flex flex-col items-center justify-center pt-36">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Team Member Found
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md">
                    No team members have been added yet. Click on the button below to add your team member.
                  </p>
                </div>
                <button
                  // onClick={handleAddTeamMember}
                  className="px-6 py-3 bg-[#664286] text-white rounded-lg hover:bg-[#7A4B9D] font-medium"
                >
                  Add Team Member
                </button>
              </div>
    </div>
        </div>

  );
};

export default TeacherTeam;
