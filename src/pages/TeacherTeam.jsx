import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherTeam = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('teamMembers');
      if (raw) setMembers(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white min-h-screen rounded-lg shadow p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold mb-6">My Team</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Sort by ▼
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Status ▼
            </button>
            <button
              onClick={() => navigate('/teacher/my_team/add')}
              className="px-4 py-2 bg-[#664286] text-white rounded-lg hover:bg-[#7A4B9D]"
            >
              Add Team Member
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        {members.length === 0 ? (
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
              onClick={() => navigate('/teacher/my_team/add')}
              className="px-6 py-3 bg-[#664286] text-white rounded-lg hover:bg-[#7A4B9D] font-medium"
            >
              Add Team Member
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Team Members</h2>
            <div className="space-y-3">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="p-3 border rounded flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-sm text-gray-500">
                      {m.email} • {m.role}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{m.phone}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AddTeamMember is now a separate page at /teacher/my_team/add */}
    </div>
  );
};

export default TeacherTeam;
