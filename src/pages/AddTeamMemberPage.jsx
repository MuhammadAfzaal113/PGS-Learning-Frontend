import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Typography } from "@mui/material";



const AddTeamMemberPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+92',
    phone: '',
    role: 'teacher',
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { name, email, countryCode, phone, role } = formData;
    const member = {
      id: Date.now(),
      name,
      email,
      phone: `${countryCode} ${phone}`,
      role,
    };

    try {
      const raw = localStorage.getItem('teamMembers');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(member);
      localStorage.setItem('teamMembers', JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save team member', e);
    }

    navigate('/teacher/my_team');
  };

  const handleCancel = () => {
    navigate('/teacher/my_team');
  };

  return (
    <div className="flex-1 bg-gray-100">
      <div className="p-4">


        {/* Form Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Add Team Member</h1>
          <p className="text-gray-600 text-sm mb-8">
            Please provide all of the information below to add your team member.
          </p>

          {/* Form */}
          <div className="space-y-6">
            {/* Name, Email, Phone Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              {/* Name */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "text.primary", mb: 1 }}
                >
                  Name
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Write here"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>

              {/* Email */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "text.primary", mb: 1 }}
                >
                  Email
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Write here"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>

              {/* Phone */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "text.primary", mb: 1 }}
                >
                  Phone
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    select
                    value={formData.countryCode}
                    onChange={(e) => handleChange("countryCode", e.target.value)}
                    variant="outlined"
                    sx={{
                      minWidth: 100,
                      "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    }}
                  >
                    <MenuItem value="+92">+92</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    <MenuItem value="+44">+44</MenuItem>
                    <MenuItem value="+91">+91</MenuItem>
                  </TextField>

                  <TextField
                    type="tel"
                    variant="outlined"
                    placeholder="Write here"
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>




            {/* Role */}
            <div className='grid grid-cols-3 gap-6'>
              <div>
                <label
                  htmlFor="role"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#374151", // Tailwind gray-700
                    marginBottom: "8px",
                  }}
                >
                  Role
                </label>

                <FormControl fullWidth variant="outlined">
                  <Select
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    sx={{
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d1d5db", // gray-300
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7e22ce", // purple-700
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7e22ce",
                      },
                    }}
                  >
                    <MenuItem value="">Select role</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>


            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-[#7A4B9D] text-white rounded-lg hover:bg-[#7A4B9D] font-medium text-sm"
              >
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMemberPage;
