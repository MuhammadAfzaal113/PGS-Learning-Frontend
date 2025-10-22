import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function InstituteDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [institute, setInstitute] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('institutes')
      const arr = raw ? JSON.parse(raw) : []
      const found = arr.find(it => String(it.id) === String(id))
      setInstitute(found || null)
    } catch (e) {
      console.error(e)
      setInstitute(null)
    }
  }, [id])

  const handleDelete = () => {
    // try {
    //   const raw = localStorage.getItem('institutes')
    //   const arr = raw ? JSON.parse(raw) : []
    //   const filtered = arr.filter(it => String(it.id) !== String(id))
    //   localStorage.setItem('institutes', JSON.stringify(filtered))
    //   navigate('/superadmin/dashboard')
    // } catch (e) {
    //   console.error(e)
    // }
  }

//   if (!institute) {
//     return (
//       <div className="p-8">
//         <h2 className="text-lg font-medium">Institute not found</h2>
//         <button onClick={() => navigate('/superadmin/dashboard')} className="mt-4 text-sm text-gray-600">Back</button>
//       </div>
//     )
//   }

  return (
    <div className="p-8">
    <div className="flex-1 bg-gray-100">
        {/* Top Bar */}
        <div className="bg-gray-800 text-white px-6 py-3 text-sm">
          institute details
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search anything..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                🔔
              </button>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Institute Details Card */}
          <div className="bg-white rounded-lg shadow p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Institute Details</h2>
                <p className="text-gray-600 text-sm">
                  Please provide all of the information below to add your team member.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDeleteInstitute}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                >
                  Delete Institute
                </button>
                <button
                  onClick={handleDisableInstitute}
                  className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 text-sm font-medium"
                >
                  Disable Institute
                </button>
              </div>
            </div>

            {/* Institute Info */}
            <div className="flex gap-8">
              {/* Institute Image/Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-gray-100 rounded-lg"></div>
              </div>

              {/* Institute Details */}
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-2">ID: {instituteData.id}</p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{instituteData.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Email: </span>
                    <span className="text-gray-900">{instituteData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone: </span>
                    <span className="text-gray-900">{instituteData.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Registered On: </span>
                    <span className="text-gray-900">{instituteData.registeredOn}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Address: </span>
                    <span className="text-gray-900">{instituteData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Linked Teachers Card */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Linked Teachers</h2>
                <p className="text-gray-600 text-sm">
                  Please provide all of the information below to add your team member.
                </p>
              </div>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 text-sm font-medium"
              >
                Add Teacher
              </button>
            </div>

            {/* Teachers Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedTeachers.map((teacher, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-700">{teacher.id}</td>
                      <td className="py-4 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                            {teacher.avatar}
                          </div>
                          <span className="text-gray-900 font-medium">{teacher.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-700">{teacher.email}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{teacher.phone}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{teacher.location}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{teacher.dateJoined}</td>
                      <td className="py-4 px-4 text-sm">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {teacher.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
    </div>
    </div>
  )
}
