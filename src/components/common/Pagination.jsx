import React from 'react';

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,     // optional: can be computed from totalCount & pageSize
  totalCount = 0, // total items from backend
  pageSize = 10,  // items per page (default)
  maxVisiblePages = 5
}) => {
  // Coerce to safe numbers
  const safeTotal = Number(totalCount) || 0;
  const safePageSize = Math.max(1, Number(pageSize) || 10);
  const safeCurrent = Math.max(1, Number(currentPage) || 1);

  // Compute total pages if not provided
  const computedTotalPages = totalPages
    ? Math.max(1, Number(totalPages))
    : Math.max(1, Math.ceil(safeTotal / safePageSize));

  // Compute start/end for display (1-based)
  const startNum = safeTotal === 0 ? 0 : (safeCurrent - 1) * safePageSize + 1;
  const endNum = safeTotal === 0 ? 0 : Math.min(safeCurrent * safePageSize, safeTotal);

  // Prepare page seeds for buttons
  const pages = [];
  let startPage = Math.max(1, safeCurrent - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(computedTotalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Handlers with safety
  const goPrev = () => setCurrentPage((p) => Math.max(1, (Number(p) || 1) - 1));
  const goNext = () => setCurrentPage((p) => Math.min(computedTotalPages, (Number(p) || 1) + 1));

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Showing {startNum} to {endNum} of {safeTotal} entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={goPrev}
          disabled={safeCurrent === 1 || computedTotalPages === 0}
          className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>

        {pages.map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 rounded ${
              safeCurrent === i ? 'bg-[#C24C99] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {i}
          </button>
        ))}

        <button
          onClick={goNext}
          disabled={safeCurrent === computedTotalPages || computedTotalPages === 0}
          className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
