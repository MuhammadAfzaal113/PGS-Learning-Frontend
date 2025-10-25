import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material'

export default function AddTeacher() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+92',
        location: '',
        city: '',
        state: '',
        country: '',
        password: '',
        confirmPassword: '',
        role: '',
    })

    const [message, setMessage] = useState('')

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            countryCode: '+92',
            location: '',
            city: '',
            state: '',
            country: '',
            password: '',
            confirmPassword: '',
            role: '',
        })
        navigate(-1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name) {
            setMessage('Name is required')
            return
        }

        // try {
        //     const raw = localStorage.getItem('institutes')
        //     const arr = raw ? JSON.parse(raw) : []
        //     const id = arr.length ? arr[arr.length - 1].id + 1 : 1
        //     const newItem = { id, ...formData }
        //     arr.push(newItem)
        //     localStorage.setItem('institutes', JSON.stringify(arr))
        //     setMessage('Institute added successfully ✅')
        //     setTimeout(() => navigate('/superadmin/dashboard'), 800)
        // } catch (err) {
        //     console.error(err)
        //     setMessage('Failed to save institute ❌')
        // }
    }

    return (
        <div className="flex-1 bg-gray-100">
            <div className="p-4">
                {/* Form Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-4">Add Teacher</h1>
                    <p className="text-gray-600 text-sm mb-8">
                        Please provide all of the information below to add your institute.
                    </p>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Name, Email, Phone Row */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                                gap: 3,
                            }}
                        >
                            {/* Name */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Name
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>

                            {/* Email */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Email
                                </Typography>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>

                            {/* Phone */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Phone
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        select
                                        value={formData.countryCode}
                                        onChange={(e) => handleChange('countryCode', e.target.value)}
                                        variant="outlined"
                                        sx={{
                                            minWidth: 100,
                                            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
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
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        {/* Email */}
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                            >
                                location
                            </Typography>
                            <TextField
                                type="email"
                                variant="outlined"
                                placeholder="Write here"
                                fullWidth
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                InputLabelProps={{ shrink: false }}
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                }}
                            />
                        </Box>

                        {/* Name, Email, Phone Row */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                                gap: 3,
                            }}
                        >
                            {/* Name */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Name
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>

                            {/* Email */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Email
                                </Typography>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>

                            {/* Email */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Email
                                </Typography>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Name, Email, Phone Row */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                                gap: 3,
                            }}
                        >
                            {/* Name */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Name
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>

                            {/* Email */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                                >
                                    Email
                                </Typography>
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    placeholder="Write here"
                                    fullWidth
                                    value={formData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    InputLabelProps={{ shrink: false }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                    }}
                                />
                            </Box>

                            {/* Email */}
                            {/* <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}
                >
                  Email
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  placeholder="Write here"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  InputLabelProps={{ shrink: false }}
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                  }}
                />
              </Box> */}
                        </Box>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                                gap: 3,
                            }}
                        >
                            <div>

                                <h1 className='font-[20px]/[100%] font-semibold '>Linked With</h1>
                                <div className="grid  gap-6">
                                    <div>
                                        <label
                                            htmlFor="role"
                                            style={{
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                color: '#374151',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            select Institute
                                        </label>

                                        <FormControl fullWidth variant="outlined">
                                            <Select
                                                id="role"
                                                displayEmpty
                                                value={formData.role}
                                                onChange={(e) => handleChange('role', e.target.value)}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                        return <span style={{ color: '#6b7280' }}>Search or select</span>
                                                    }
                                                    return selected
                                                }}
                                                sx={{
                                                    borderRadius: '8px',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#d1d5db',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#7e22ce',
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#7e22ce',
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Search or select</em>
                                                </MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="manager">Manager</MenuItem>
                                                <MenuItem value="teacher">Teacher</MenuItem>
                                                <MenuItem value="staff">Staff</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                        </Box>



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
                                Add Teacher
                            </button>
                        </div>

                        {message && (
                            <p className="text-sm text-gray-600 mt-2">{message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
