import React from 'react';

const TeacherPayments = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
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
      </div>
    </div>
  );
};

export default TeacherPayments;