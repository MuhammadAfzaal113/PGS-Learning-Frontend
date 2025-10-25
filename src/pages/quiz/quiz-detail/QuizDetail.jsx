import React, { useState } from 'react';

export default function QuizDetail() {
  const [quizData] = useState({
    title: "Quiz Details",
    questions: [
      {
        id: 1,
        question: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.",
        options: [
          "Option details write here",
          "Option details write here",
          "Option details write here",
          "Option details write here"
        ],
        correctAnswer: 1,
        correctText: "(Option 2) Lorem Ipsum Dolor Text Here"
      },
      {
        id: 2,
        question: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.",
        options: [
          "Option details write here",
          "Option details write here",
          "Option details write here",
          "Option details write here"
        ],
        correctAnswer: 1,
        correctText: "(Option 2) Lorem Ipsum Dolor Text Here"
      },
      {
        id: 3,
        question: "Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.",
        options: [
          "Option details write here",
          "Option details write here",
          "Option details write here",
          "Option details write here"
        ],
        correctAnswer: 1,
        correctText: "(Option 2) Lorem Ipsum Dolor Text Here"
      }
    ]
  });

  const handleUnlikeQuiz = () => {
    console.log("Unlike Quiz clicked");
  };

  const handleEditQuiz = () => {
    console.log("Edit Quiz clicked");
  };

  const handleDeleteQuiz = () => {
    console.log("Delete Quiz clicked");
  };

  return (
    <div className="min-h-screen  flex">
      {/* Sidebar */}
      {/* <div className="w-64 bg-gray-800 text-white p-4 border-r border-gray-700">
        <div className="mb-8 p-3 bg-blue-600 rounded-lg">
          <h2 className="text-lg font-semibold">Pro Genius Student</h2>
        </div>
        <nav className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>📊</span>
            <span className="text-sm">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>📚</span>
            <span className="text-sm">Courses</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded bg-purple-700 cursor-pointer">
            <span>❓</span>
            <span className="text-sm">Quizzes</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>👥</span>
            <span className="text-sm">Students</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>👤</span>
            <span className="text-sm">My Team</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>💳</span>
            <span className="text-sm">Payments</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>⭐</span>
            <span className="text-sm">Rating & Reviews</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>🔒</span>
            <span className="text-sm">Permissions</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-300">
            <span>⚙️</span>
            <span className="text-sm">Settings</span>
          </div>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Top Bar */}
        {/* <div className="bg-gray-800 text-white px-6 py-3 text-sm">
          Quiz details
        </div> */}

        {/* Content Area */}
        <div className="p-8">
          {/* Header */}
          {/* <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search anything..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                🔔
              </button>
            </div>
          </div> */}

          {/* Quiz Details Card */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quiz Details</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUnlikeQuiz}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                >
                  Unlike Quiz
                </button>
                <button
                  onClick={handleEditQuiz}
                  className="px-4 py-2 bg-[#664286] text-white rounded-lg hover:bg-[#664286] text-sm font-medium"
                >
                  Edit Quiz
                </button>
                <button
                  onClick={handleDeleteQuiz}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {quizData.questions.map((q, index) => (
                <div key={q.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  {/* Question Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Question {index + 1}
                  </h3>
                  
                  {/* Question Text */}
                  <p className="text-gray-700 mb-4">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 mb-3">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          disabled
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded"
                        />
                        <span className="text-gray-600 text-sm">{option}</span>
                      </div>
                    ))}
                  </div>

                  {/* Correct Answer */}
                  <div className="bg-green-100 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="text-green-700 font-medium text-sm">Correct</span>
                      <p className="text-green-600 text-sm">{q.correctText}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          {/* <div className="mt-8 text-center py-4 bg-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <span>©</span>
              <span>Copyrights Futuro 2024 - All Rights Reserved.</span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}