import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';

const DataTable = ({ 
  columns, 
  data, 
  title, 
  searchPlaceholder = "Search", 
  showSearch = true,
  showSortBy = false,
  showStatus = false,
  showAddButton = false,
  addButtonText = "Add",
  onAdd,
  onRowClick,
  itemsPerPage = 10,
  showPagination = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const isTeacherDashboard = location.pathname.includes('/teacher/dashboard');

  // Filter data based on search
  const filteredData = data.filter(row => {
    return columns.some(col => {
      const value = col.render ? col.render(row) : row[col.key];
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Pagination setup
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // ✅ Only make rows clickable for the "Rating & Reviews" table
  const isReviewTable = title === 'Rating & Reviews';

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className={`${isTeacherDashboard ? 'text-xl' : 'text-[24px]/[100%]'} font-semibold text-black`}>
            {title}
          </h2>
          <div className="flex items-center gap-3">
            {showSearch && (
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
            {showSortBy && (
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Sort by ▼
              </button>
            )}
            {showStatus && (
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Status ▼
              </button>
            )}
            {showAddButton && (
              <button 
                onClick={onAdd}
                className="px-4 py-2 bg-[#664286] text-white rounded-lg hover:bg-[#7A4B9D]"
              >
                {addButtonText}
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((col, idx) => (
                  <th 
                    key={idx}
                    className="text-left py-3 text-sm font-medium text-[#BDBDBD]"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`border-b border-gray-100 ${
                    isReviewTable ? 'hover:bg-gray-50 cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (isReviewTable && onRowClick) onRowClick(row);
                  }}
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className={`py-4 text-sm ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredData.length}
        />
      )}
    </div>
  );
};

export default DataTable;
