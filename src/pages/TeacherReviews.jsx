import React from 'react';
import DataTable from '../components/common/DataTable';

const TeacherReviews = () => {
  const sample = [
    { id: 1, reviewBy: 'Alice Johnson', avatar: '👨', rating: 5, review: 'Great course!', course: 'Principles of UI Design', dateReview: 'Sep 28, 2025' },
    { id: 2, reviewBy: 'Brian Smith', avatar: '👨', rating: 4, review: 'Very helpful.', course: 'Principles of UI Design', dateReview: 'Sep 28, 2025' },
    { id: 3, reviewBy: 'Carla Gomez', avatar: '👩', rating: 3, review: 'Could use more examples.', course: 'Basics of Python', dateReview: 'Sep 28, 2025' },
  ];

  const rows =  sample;

  const columns = [
      { header: 'ID', key: 'id', className: 'text-[#424242]' },
    { 
      header: 'Review By', 
      key: 'reviewBy',
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className=" rounded-full bg-gray-200 flex items-center justify-center">{row.avatar}</span>
          <span className="text-[#424242]">{row.reviewBy}</span>
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
      {/* <h1 className="text-2xl font-bold mb-6">Ratings & Reviews</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-4xl font-bold">4.8</div>
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <div className="text-sm text-gray-600">Overall Rating</div>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm w-12">5 ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                    <div className="h-2 bg-yellow-400 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <span className="text-sm w-12">80%</span>
                </div>
              
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
                <span className="text-gray-500">2 days ago</span>
              </div>
              <p className="mt-2 text-gray-600">
                Excellent teaching style and very comprehensive content!
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <DataTable
        title="Rating & Reviews"
        columns={columns} 
        data={rows}
        showSearch={true}
        showStatus={true}
        showSortBy={true}
        searchPlaceholder="Search"
        showPagination={true} 
      />
    </div>
  );
};

export default TeacherReviews;