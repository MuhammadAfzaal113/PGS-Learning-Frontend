import React from 'react';
import DataTable from '../components/common/DataTable';

const TeacherPayments = () => {
  const paymentsData = [
    { id: '564566', name: 'Cameron Williamson', avatar: '👨', email: 'cameron.william@gmail.com', course: 'Principle of UI Design', amount: '$50.00', date: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'Darrell Steward', avatar: '👨', email: 'darrelstew9205@gmail.com', course: 'Principle of UI Design', amount: '$50.00', date: 'Sep 28, 2025', status: 'Active' },
    { id: '564566', name: 'Albert Flores', avatar: '👨', email: 'albertflores@gmail.com', course: 'Basics of Python', amount: '$50.00', date: 'Sep 28, 2025', status: 'Active' },
  ];

  const paymentsColumns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]' },
    {
      header: 'Name', 
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">{row.avatar}</span>
          <span className="text-[#424242]">{row.name}</span>
        </div>
      )
    },
    // { header: 'Email', key: 'email', className: 'text-[#424242]' },
    { header: 'Course', key: 'course', className: 'text-[#424242]' },
    { header: 'Amount', key: 'amount', className: 'text-[#424242]' },
    { header: 'Date Invoice', key: 'date', className: 'text-[#424242]' },
    { 
      header: 'Status', 
      key: 'status',
      render: (row) => (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          {row.status}
        </span>
      )
    },
    {
      header: '',
      key: 'actions',
      render: () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      )
    }
  ];
  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-6">Payments</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-600">Total Earnings</h3>
              <p className="text-2xl font-bold">$15,750</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-600">This Month</h3>
              <p className="text-2xl font-bold">$2,450</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-gray-600">Pending</h3>
              <p className="text-2xl font-bold">$750</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">Oct 8, 2025</td>
                  <td className="px-6 py-4">Course Payment - React Basics</td>
                  <td className="px-6 py-4">$199.00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
      <DataTable
        title="Payments"
        columns={paymentsColumns}
        data={paymentsData}
        showPagination={true}
        showSearch={true}
        showSortBy={true}
        showStatus={true}
      />

    </div>
  );
};

export default TeacherPayments;