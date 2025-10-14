import React from 'react';
import DataTable from '../../components/common/DataTable';

const PaymentsTable = ({ payments }) => {
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
    { header: 'Email', key: 'email', className: 'text-[#424242]' },
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
      title="Payments"
      columns={paymentsColumns}
      data={paymentsData}
      showPagination={false}
      showSearch={false}
    />
  );
}
export default PaymentsTable;
