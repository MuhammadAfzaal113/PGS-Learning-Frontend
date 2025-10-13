import React from 'react';

const TeacherQuizzes = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Quizzes</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create New Quiz
          </button>
        </div>
        <div className="space-y-4">
          {/* Quiz List */}
          <div className="border-b pb-4">
            <h3 className="font-medium">React Fundamentals Quiz</h3>
            <p className="text-sm text-gray-600">20 questions • 30 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherQuizzes;