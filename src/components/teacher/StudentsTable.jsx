import React from 'react';
import DataTable from '../../components/common/DataTable';

const StudentsTable = ({ students }) => {
  const studentsData = [
    { id: '564566', name: 'Ralph Edwards', avatar: '👨', courses: '07', email: 'ralph.edwards@example.com', phone: '(704) 555-0127', location: 'Kent, Utah', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Eleanor Pena', avatar: '👩', courses: '07', email: 'elenor.pena@example.com', phone: '(684) 555-0102', location: 'Lansing, Illinois', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Cody Fisher', avatar: '👨', courses: '07', email: 'codyfisher@example.com', phone: '(808) 555-0111', location: 'Corona, Michigan', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Eleanor Pena', avatar: '👩', courses: '07', email: 'elenor.pena@example.com', phone: '(684) 555-0102', location: 'Lansing, Illinois', registeredOn: 'Sep 28, 2025' },
    { id: '564566', name: 'Ralph Edwards', avatar: '👨', courses: '07', email: 'ralph.edwards@example.com', phone: '(704) 555-0127', location: 'Kent, Utah', registeredOn: 'Sep 28, 2025' },

  ];

  const studentsColumns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { 
      header: 'Name', 
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className=" rounded-full bg-gray-200 flex items-center justify-center">{row.avatar}</span>
          <span className="text-[#424242]">{row.name}</span>
        </div>
      )
    },
    // { header: 'Courses Purchased', key: 'courses', className: 'text-gray-600' },
    { header: 'Email', key: 'email', className: 'text-[#424242]' },
    // { header: 'Phone', key: 'phone', className: 'text-gray-600' },
    // { header: 'Location', key: 'location', className: 'text-gray-600' },
    { header: 'Registered On', key: 'registeredOn', className: 'text-[#424242]' }
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
      title="Students"
      columns={studentsColumns}
      data={studentsData}
      showSearch={false}
      showSortBy={false}
      searchPlaceholder="Search"
      showPagination={false}
    />
  );
};

export default StudentsTable;
