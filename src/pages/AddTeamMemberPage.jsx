import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import { protectedAPI } from "../api/axiosClient";

const AddTeamMemberPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+92',
    phone: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // 👉 NEW: modal control
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role.';
    }

    // Phone validation (numbers only)
    const phoneRegex = /^[0-9]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must contain only digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      email: formData.email,
      full_name: formData.name,
      phone: formData.phone,
      user_role:
        formData.role === 'admin'
          ? 1
          : formData.role === 'teacher'
          ? 2
          : formData.role === 'students'
          ? 3
          : 4,
    };

    try {
        const res = await protectedAPI.createTeam(payload);
      console.log('Team member created:', res);
          // 👉 SUCCESS → Show Modal (do NOT navigate yet)
      setShowModal(true);
    } catch (err) {
      console.error('API Error:', err);
      setErrors({ api: err.message || 'Failed to create team member.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 👇 Clear the validation error for this specific field
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

    // 👉 Close modal + go back to team list
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/my_team'); // move back to table list
  };

  return (
    <div className="flex-1 bg-gray-100">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Add Team Member</h1>
          <p className="text-gray-600 text-sm mb-8">
            Please provide all of the information below to add your team member.
          </p>

          {errors.api && <div className="text-red-600 mb-4">{errors.api}</div>}

          <div className="space-y-6">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {/* Name */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Name
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Write here"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </Box>

              {/* Email */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Email
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Write here"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </Box>

              {/* Phone */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Phone
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    select
                    value={formData.countryCode}
                    onChange={(e) => handleChange('countryCode', e.target.value)}
                    variant="outlined"
                    sx={{ minWidth: 100 }}
                  >
                    <MenuItem value="+92">+92</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    <MenuItem value="+44">+44</MenuItem>
                    <MenuItem value="+91">+91</MenuItem>
                  </TextField>

                  <TextField
                    variant="outlined"
                    placeholder="Write here"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </Box>
              </Box>
            </Box>

            {/* Role */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>

                <FormControl fullWidth error={!!errors.role}>
                  <Select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    displayEmpty
                    sx={{ borderRadius: '8px' }}
                    renderValue={(selected) => {
                      if (selected === "") {
                        return <span className="text-gray-400">Select role</span>;
                      }
                      return selected.charAt(0).toUpperCase() + selected.slice(1);
                    }}
                  >
                    {/* Placeholder (Disabled so user cannot select again) */}
                    <MenuItem value="" disabled>
                      Select role
                    </MenuItem>

                    <MenuItem value="admin">Admin</MenuItem>
                    {/* <MenuItem value="manager">Manager</MenuItem> */}
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="students">Students</MenuItem>
                  </Select>

                  {errors.role && (
                    <FormHelperText>{errors.role}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
              <button
                onClick={() => navigate('/my_team')}
                className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 bg-[#7A4B9D] text-white rounded-lg hover:bg-[#693a88] font-medium text-sm"
              >
                {loading ? 'Adding...' : 'Add Team Member'}
              </button>
            </div>
          </div>
        </div>
      </div>

       {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 border border-blue-400 relative">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Team Member Added
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Your team member has been added successfully. You can manage your team mates in your team list.
            </p>

            <div className="flex justify-end">
              <button
                 onClick={handleCloseModal}
                className="bg-[#664286] hover:bg-[#59367a] text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Close
              </button>
            </div>

            <button
               onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeamMemberPage;
