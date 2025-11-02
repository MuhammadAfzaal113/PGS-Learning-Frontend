import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import Pagination from '../../components/common/Pagination'; // ✅ assuming you already have this
import { fetchQuizzes } from '../../features/quiz/quizSlice';
import { useDispatch, useSelector } from 'react-redux';

const Quizzes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes, loading, error } = useSelector((state) => state.quiz);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetch quizzes when page changes
  useEffect(() => {
    dispatch(fetchQuizzes({ index: currentPage - 1, offset: itemsPerPage }));
  }, [dispatch, currentPage]);

  // ✅ Columns
  const columns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { header: 'Title', key: 'title', className: 'text-[#424242]' },
    { header: 'Questions', key: 'questions', className: 'text-[#424242]' },
    { header: 'Linked With', key: 'linked_with', className: 'text-[#424242]' },
    { header: 'Added On', key: 'addedOn', className: 'text-[#424242]' },
    {
      header: 'Status',
      key: 'status',
      render: (row) => {
        const statusColors = {
          Active: 'bg-green-100 text-green-700',
          'In-Active': 'bg-gray-100 text-gray-700',
          'In-Approval': 'bg-yellow-100 text-yellow-700',
          Rejected: 'bg-red-100 text-red-700',
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs text-[#424242] ${
              statusColors[row.status] || ''
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: '',
      key: 'actions',
      render: () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      ),
    },
  ];

  // ✅ Handle loading & errors
  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading quizzes...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-6">
        Failed to load quizzes: {error}
      </div>
    );

  // ✅ Handle empty state
  const tableData = Array.isArray(quizzes?.results || quizzes)
    ? quizzes?.results || quizzes
    : [];

  const total = quizzes?.total || tableData.length || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="h-full bg-white rounded-lg shadow p-6">
      <DataTable
        title="Quizzes"
        columns={columns}
        data={tableData}
        showSearch={true}
        showSortBy={true}
        showStatus={true}
        showAddButton={true}
        addButtonText="Create Quiz"
        onAdd={() => navigate('/teacher/quizes/create')}
        searchPlaceholder="Search"
      />

      {/* ✅ External Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={(currentPage - 1) * itemsPerPage + 1}
          endIndex={Math.min(currentPage * itemsPerPage, total)}
          totalCount={total}
        />
      )}
    </div>
  );
};

export default Quizzes;
