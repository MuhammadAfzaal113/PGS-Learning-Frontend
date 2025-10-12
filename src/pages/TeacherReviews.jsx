import React from 'react';

const TeacherReviews = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Ratings & Reviews</h1>
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
                {/* Add more rating bars here */}
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
      </div>
    </div>
  );
};

export default TeacherReviews;