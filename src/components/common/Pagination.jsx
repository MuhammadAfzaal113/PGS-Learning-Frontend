import React from 'react';

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  totalCount,
  maxVisiblePages = 5
}) => {
  const pages = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`px-3 py-1 rounded ${
          currentPage === i
            ? 'bg-[#C24C99] text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Showing {Math.min(startIndex + 1, totalCount || 0)} to {Math.min(endIndex, totalCount || 0)} of {totalCount} entries
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
