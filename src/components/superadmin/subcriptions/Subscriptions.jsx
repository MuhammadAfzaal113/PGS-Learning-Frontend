import React from 'react';
import DataTable from '../../common/DataTable';


const Subscriptions = () => {
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
    // { header: 'Courses Purchased', key: 'courses', className: 'text-[#424242]' },
    { header: 'Email', key: 'email', className: 'text-[#424242]' },
    { header: 'Phone', key: 'phone', className: 'text-[#424242]' },
    { header: 'Location', key: 'location', className: 'text-[#424242]' },
    { header: 'Registered On', key: 'registeredOn', className: 'text-[#424242]' },

    {
      header: '',
      key: 'actions',
      render: () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      )
    }
  ];

  return (
    <div className=" p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Students</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">john@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap">3</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-500 hover:text-blue-700">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      <div className='h-full bg-white rounded-lg shadow'>
      <DataTable
        title="Students"
        columns={studentsColumns}
        data={studentsData}
        showSearch={true}
        showSortBy={true}
        searchPlaceholder="Search"
        showPagination={true}
      />
      </div>
    </div>
  );
};

export default Subscriptions;