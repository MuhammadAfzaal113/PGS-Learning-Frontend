import React from 'react';
import DataTable from '../../components/common/DataTable';

const CoursesTable = ({ courses }) => {
  const coursesData = [
    { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'UX Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'Basics of Python', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'Basics of linguistics', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Active' },
    { id: '564566', name: 'Principles of UI Design', topics: '07', hours: '32h, 30min', price: '$29.00', students: '08', rating: 5.0, addedOn: 'Sep 28, 2025', status: 'In-Approval' },
  ];

  const coursesColumns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { header: 'Name', key: 'name', className: 'text-[#424242]' },
    // { header: 'Topics', key: 'topics', className: 'text-gray-600' },
    // { header: 'Total Hours', key: 'hours', className: 'text-gray-600' },
    // { header: 'Price', key: 'price', className: 'text-gray-600' },
    { header: 'Students', key: 'students', className: 'text-[#424242]' },
    // { 
    //   header: 'Ratings', 
    //   key: 'rating',
    //   render: (row) => (
    //     <div className="flex items-center gap-1">
    //       <span className="text-yellow-500">★</span>
    //       <span>{row.rating}</span>
    //     </div>
    //   )
    // },
    { header: 'Added On', key: 'addedOn', className: 'text-[#424242]' },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => {
        const statusColors = {
          'Active': 'bg-green-100 text-green-700',
          'In-Active': 'bg-gray-100 text-gray-700',
          'In-Approval': 'bg-yellow-100 text-yellow-700',
          'Rejected': 'bg-red-100 text-red-700'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs text-[#424242] ${statusColors[row.status]}`}>
            {row.status}
          </span>
        );
      }
    }
    // {
    //   header: '',
    //   key: 'actions',
    //   render: () => (
    //     <button className="text-gray-400 hover:text-gray-600">⋮</button>
    //   )
    // }
  ];

  return (
    <DataTable
      title="Courses"
      columns={coursesColumns}
      data={coursesData}
      showSearch={false}
      showSortBy={false}
      showStatus={false}
      showAddButton={false}
      addButtonText="Add Course"
      searchPlaceholder="Search"
      showPagination={false}
    />
  );
};

export default CoursesTable;
