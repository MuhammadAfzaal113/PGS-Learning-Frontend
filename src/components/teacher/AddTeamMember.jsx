import React, { useState } from 'react';

const AddTeamMember = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+92',
    phone: '',
    role: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // Generic input handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save new member
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      // alert('Please fill in all fields.');
      return;
    }

    const newMember = { id: Date.now(), ...formData };
    onSave(newMember);

    setFormData({
      name: '',
      email: '',
      countryCode: '+92',
      phone: '',
      role: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '+92',
      phone: '',
      role: '',
    });
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="flex-1 bg-gray-100">
        {/* Top Bar */}
        <div className="bg-gray-800 text-white px-6 py-3 text-sm">
          Add Team Member
        </div>

        {/* Content Area */}
        <div className="p-8">
          <div className="bg-white rounded-lg shadow p-8 max-w-4xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Add Team Member
            </h2>
            <p className="text-gray-600 text-sm mb-8">
              Please provide all of the information below to add your team member.
            </p>

            <div className="space-y-6">
              {/* Name, Email, Phone Row */}
              <div className="grid grid-cols-3 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Write here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Write here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleChange('countryCode', e.target.value)}
                      className="px-3 py-3 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                    >
                      <option value="+92">+92</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                    </select>

                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="Write here"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm 
                    bg-white appearance-none cursor-pointer"
                  >
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Staff">Staff</option>
                  </select>

                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 
                  rounded-lg font-medium text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-purple-700 text-white rounded-lg 
                  hover:bg-purple-800 font-medium text-sm"
                >
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-gray-200 p-2">
                    {selectedReview.avatar}
                  </span>
                  <div>
                    <p>ID: {selectedReview.id}</p>
                    <h5 className="reviewName">{selectedReview.reviewBy}</h5>
                  </div>
                </div>
                <div className="flex gap-2">
                  <p>{selectedReview.rating}</p>
                  <span className="text-[#F57C00]">★</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{selectedReview.review}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-700 hover:bg-purple-800 text-white 
                px-4 py-2 rounded-md text-sm font-medium"
              >
                Close
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTeamMember;
