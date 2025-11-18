import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';

const Reviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleRowClick = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

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
    <div className="p-6">
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
      <div className='h-full bg-white rounded-lg shadow'>
      <DataTable
        title="Rating & Reviews"
        columns={columns} 
        data={rows}
        showSearch={true}
        showStatus={true}
        showSortBy={true}
        searchPlaceholder="Search"
        showPagination={true}
        onRowClick={handleRowClick}
      />
      </div>
            {/* Review Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <div className="mb-4">
              <div className='flex justify-between items-center'>
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-gray-200 p-2">{selectedReview.avatar}</span>
                <div>
                <p>ID: {selectedReview.id}</p>
                <h5 className="reviewName">{selectedReview.reviewBy}</h5>
                </div>
              </div>
              <div className=" flex gap-2 ">
                 <p>{selectedReview.rating}</p>
                 <span className="text-[#F57C00]">★</span>
              </div>
              </div>
              <p className="text-gray-600 mb-2">{selectedReview.review}</p>
              {/* <div className="text-sm text-gray-500">
                <p>Course: {selectedReview.course}</p>
                <p>Date: {selectedReview.dateReview}</p>
              </div> */}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Close
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;