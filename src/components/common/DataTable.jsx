import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const DataTable = ({ 
  columns, 
  data = [], // default to empty array
  title, 
  searchPlaceholder = "Search", 
  showSearch = true,
  showSortBy = false,
  showStatus = false,
  showAddButton = false,
  addButtonText = "Add",
  onAdd,
  onRowClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const location = useLocation();
  const isTeacherDashboard = location.pathname.includes('/dashboard');

  // ✅ Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  // ✅ Filter data based on search
    let filteredData = safeData.filter(row =>
      columns.some(col => {
        const searchField = col.searchKey || col.key;
        const value = row[searchField];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );

    // SORT logic
    if (sortField) {
      filteredData = [...filteredData].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (typeof valueA === "string") {
          return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      });
    }

  // ✅ Only make rows clickable for the "Rating & Reviews" table
  const isReviewTable = title === 'Rating & Reviews';

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`${
            isTeacherDashboard ? 'text-xl' : 'text-[24px]/[100%]'
          } font-semibold text-black`}
        >
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
            <select
              value={sortField}
              onChange={(e) => {
                const value = e.target.value;
                if (sortField === value) {
                  // same field → toggle order
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                } else {
                  // new field → set ascending
                  setSortField(value);
                  setSortOrder("asc");
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg appearance-none"
            >
            <option value="" >
              Sort by ▼
            </option>

              {columns
                .filter(col => col.sortable)
                .map((col, idx) => (
                  <option key={idx} value={col.sortKey || col.key}>
                    {col.header}
                  </option>
                ))}
            </select>
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
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIdx) => (
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
                    <td
                      key={colIdx}
                      className={`py-4 text-sm ${col.className || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 h-[70vh] text-gray-500 text-sm"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
