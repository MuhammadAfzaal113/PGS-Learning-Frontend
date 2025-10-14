import React from 'react';
import DataTable from '../../components/common/DataTable';

const ReviewsTable = ({ reviews }) => {
  const sample = [
    { id: 1, reviewBy: 'Alice Johnson', rating: 5, review: 'Great course!', course: 'Principles of UI Design' },
    { id: 2, reviewBy: 'Brian Smith', rating: 4, review: 'Very helpful.', course: 'Principles of UI Design' },
    { id: 3, reviewBy: 'Carla Gomez', rating: 3, review: 'Could use more examples.', course: 'Basics of Python' },
  ];

  const rows = reviews ?? sample;

  const columns = [
      { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { 
      header: 'Review By', 
      key: 'reviewBy',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className=" rounded-full bg-gray-200 flex items-center justify-center">{row.avatar}</span>
          <span className="text-[#424242]">{row.name}</span>
        </div>
      )
    },
      { header: 'Course', key: 'course', className: 'text-[#424242]' },

    {
      header: 'Rating',
      key: 'rating',
      cell: (row) => Array.from({ length: row.rating }).map((_, i) => '★').join(''),
    },
    { header: 'Review', key: 'review', className: 'text-[#424242]' },
    { header: 'Date Review', key: 'dateReview', className: 'text-[#424242]' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recent Reviews</h3>
      <DataTable
        title="Rating & Reviews"
        columns={columns} 
        data={rows}
        showSearch={true}
        showSortBy={true}
        searchPlaceholder="Search"
        showPagination={true} 
      />
    </div>
  );
};

export default ReviewsTable;
