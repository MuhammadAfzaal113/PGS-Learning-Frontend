import React, {useState} from 'react';

const TeacherPermissions = () => {
  const [permissions, setPermissions] = useState({
    instructors: {
      viewInstructors: { admin: false, manager: false },
      addInstructor: { admin: false, manager: false },
      editInstructorDetails: { admin: false, manager: false },
      blockUnblockInstructor: { admin: false, manager: false },
      removeInstructor: { admin: false, manager: false }
    },
    students: {
      viewStudents: { admin: false, manager: false },
      addStudent: { admin: false, manager: false },
      editStudentDetails: { admin: false, manager: false },
      blockUnblockStudent: { admin: false, manager: false },
      deleteStudent: { admin: false, manager: false }
    }
  });

  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [newInstructorPermission, setNewInstructorPermission] = useState('');
  const [newStudentPermission, setNewStudentPermission] = useState('');

  const togglePermission = (category, permission, role) => {
    setPermissions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: {
          ...prev[category][permission],
          [role]: !prev[category][permission][role]
        }
      }
    }));
  };

  const addInstructorPermission = () => {
    if (newInstructorPermission.trim()) {
      const key = newInstructorPermission.toLowerCase().replace(/\s+/g, '');
      setPermissions(prev => ({
        ...prev,
        instructors: {
          ...prev.instructors,
          [key]: { admin: false, manager: false }
        }
      }));
      setNewInstructorPermission('');
      setShowInstructorForm(false);
    }
  };

  const addStudentPermission = () => {
    if (newStudentPermission.trim()) {
      const key = newStudentPermission.toLowerCase().replace(/\s+/g, '');
      setPermissions(prev => ({
        ...prev,
        students: {
          ...prev.students,
          [key]: { admin: false, manager: false }
        }
      }));
      setNewStudentPermission('');
      setShowStudentForm(false);
    }
  };

  const formatPermissionName = (key) => {
    return key.replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-6">Permissions</h1>
    //   <div className="bg-white rounded-lg shadow-lg p-4">
    //     <div className="space-y-6">
    //       <div className="border-b pb-4">
    //         <h2 className="text-lg font-semibold mb-4">Team Permissions</h2>
    //         <div className="space-y-4">
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <h3 className="font-medium">Course Management</h3>
    //               <p className="text-sm text-gray-600">Ability to create and edit courses</p>
    //             </div>
    //             <label className="switch">
    //               <input type="checkbox" checked readOnly />
    //               <span className="slider round"></span>
    //             </label>
    //           </div>
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <h3 className="font-medium">Student Management</h3>
    //               <p className="text-sm text-gray-600">Access to student information and enrollment</p>
    //             </div>
    //             <label className="switch">
    //               <input type="checkbox" checked readOnly />
    //               <span className="slider round"></span>
    //             </label>
    //           </div>
    //         </div>
    //       </div>

    //       <div>
    //         <h2 className="text-lg font-semibold mb-4">Role Management</h2>
    //         <div className="space-y-4">
    //           <div className="p-4 border rounded-lg">
    //             <h3 className="font-medium">Assistant Teacher</h3>
    //             <p className="text-sm text-gray-600 mt-2">
    //               Can view and grade assignments, but cannot modify course content
    //             </p>
    //             <button className="mt-2 text-blue-500 hover:text-blue-700">
    //               Edit Permissions
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    
    <div className='p-4'>

    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Permissions</h2>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 mb-4 pb-3 border-b border-gray-200">
        <div className="text-sm font-medium text-gray-400">Roles</div>
        <div className="text-sm font-medium text-gray-400 text-center">Admin</div>
        <div className="text-sm font-medium text-gray-400 text-center">Manager</div>
      </div>

      {/* Instructors Section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Instructors</h3>

        {Object.entries(permissions.instructors).map(([key, roles]) => (
          <div key={key} className="grid grid-cols-[2fr,1fr,1fr] gap-4 py-3 border-b border-gray-100 hover:bg-gray-50">
            <div className="text-sm text-gray-700">{formatPermissionName(key)}</div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={roles.admin}
                onChange={() => togglePermission('instructors', key, 'admin')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={roles.manager}
                onChange={() => togglePermission('instructors', key, 'manager')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
              />
            </div>
          </div>
        ))}

        {showInstructorForm ? (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={newInstructorPermission}
              onChange={(e) => setNewInstructorPermission(e.target.value)}
              placeholder="Enter permission name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addInstructorPermission}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
            >
              Add
            </button>
            <button
              onClick={() => setShowInstructorForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInstructorForm(true)}
            className="mt-3 text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            +Add Permission
          </button>
        )}
      </div>

      {/* Students Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Students</h3>

        {Object.entries(permissions.students).map(([key, roles]) => (
          <div key={key} className="grid grid-cols-[2fr,1fr,1fr] gap-4 py-3 border-b border-gray-100 hover:bg-gray-50">
            <div className="text-sm text-gray-700">{formatPermissionName(key)}</div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={roles.admin}
                onChange={() => togglePermission('students', key, 'admin')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={roles.manager}
                onChange={() => togglePermission('students', key, 'manager')}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
              />
            </div>
          </div>
        ))}

        {showStudentForm ? (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={newStudentPermission}
              onChange={(e) => setNewStudentPermission(e.target.value)}
              placeholder="Enter permission name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addStudentPermission}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
            >
              Add
            </button>
            <button
              onClick={() => setShowStudentForm(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowStudentForm(true)}
            className="mt-3 text-purple-600 text-sm font-medium hover:text-purple-700"
          >
            +Add Permission
          </button>
        )}
      </div>
    </div>
    </div>

  );
};

export default TeacherPermissions;
