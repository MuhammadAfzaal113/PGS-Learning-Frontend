import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../data/courses.json';
import DataTable from '../components/common/DataTable';


const TeacherCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
    const coursesData = [
    { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'UX Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'Basics of Python', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'Basics of linguistics', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Active' },
    { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Approval' },
    // { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    // { id: '564566', name: 'UX Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    // { id: '564566', name: 'Basics of Python', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    // { id: '564566', name: 'Basics of linguistics', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Active' },
    // { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Approval' },
    // { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    // { id: '564566', name: 'UX Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    // { id: '564566', name: 'Basics of Python', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    // { id: '564566', name: 'Basics of linguistics', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Active' },
    // { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Approval' },
  ];

  const coursesColumns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { header: 'Name', key: 'name', className: 'text-[#424242]' },
    { header: 'Topics', key: 'topics', className: 'text-[#424242]' },
    { header: 'Total Hours', key: 'hours', className: 'text-[#424242]' },
    { header: 'Price', key: 'price', className: 'text-[#424242]' },
    { header: 'Students', key: 'students', className: 'text-[#424242]' },
    { 
      header: 'Ratings', 
      key: 'rating',
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{row.rating}</span>
        </div>
      )
    },
    { header: 'Added On', key: 'addedOn', className: 'text-[#424242]' },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => {
        const statusColors = {
          'Active': 'bg-green-100 text-[#424242]',
          'In-Active': 'bg-gray-100 text-[#424242]',
          'In-Approval': 'bg-yellow-100 text-[#424242]',
          'Rejected': 'bg-red-100 text-[#424242]'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs text-[#424242] ${statusColors[row.status]}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: '',
      key: 'actions',
      render: () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      )
    }
  ];

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setCourses(coursesData.courses);
  }, []);

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-2xl font-semibold mb-2">No Courses Yet</h2>
      <p className="text-gray-600 mb-6">Start creating your first course and share your knowledge!</p>
      <button
        onClick={() => navigate('/teacher/courses/add')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Your First Course
      </button>
    </div>
  );

  return (
    <div className="min-h-[90vh] ">

        <DataTable
            title="Courses"
            columns={coursesColumns}
            data={coursesData}
            showSearch={true}
            showSortBy={true}
            showStatus={true}
            showAddButton={true}
            addButtonText="Add Course"
            searchPlaceholder="Search"
            showPagination={true}
          />
      {/* <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Courses</h1>
          {courses?.length > 0 && (
            <button
              onClick={() => navigate('/teacher/courses/add')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Course
            </button>
          )}
        </div>

        {courses?.length === 0 ? (
          <EmptyState />
        ) : (
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          //   {courses.map((course) => (
          //     <div
          //       key={course.id}
          //       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          //     >
          //       <div 
          //         className="h-48 bg-gray-200 relative cursor-pointer"
          //         onClick={() => navigate(`/teacher/courses/${course.id}`)}
          //       >
          //         <img
          //           src={course.coverImage}
          //           alt={course.title}
          //           className="w-full h-full object-cover"
          //         />
          //       </div>
          //       <div className="p-6">
          //         <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600"
          //             onClick={() => navigate(`/teacher/courses/${course.id}`)}
          //         >
          //           {course.title}
          //         </h3>
          //         <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
          //         <div className="flex justify-between items-center">
          //           <span className="text-sm text-gray-500">{course.students} students</span>
          //           <div className="space-x-2">
          //             <button 
          //               onClick={() => navigate(`/teacher/courses/${course.id}`)}
          //               className="text-blue-600 hover:text-blue-700"
          //             >
          //               View
          //             </button>
          //             <span className="text-gray-300">|</span>
          //             <button 
          //               onClick={() => navigate(`/teacher/courses/edit/${course.id}`)}
          //               className="text-blue-600 hover:text-blue-700"
          //             >
          //               Edit
          //             </button>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   ))}
          // </div>
        
        )}
      </div> */}
    </div>
  );
};

export default TeacherCourses;