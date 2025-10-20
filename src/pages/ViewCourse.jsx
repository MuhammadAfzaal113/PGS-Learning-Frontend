import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // In a real app, you would fetch this data from your backend
  const course = {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React.js and modern web development",
    coverImage: "/course-images/react-basics.jpg",
    language: "English",
    price: 49.99,
    students: 30,
    whatYoullLearn: [
      "Understand React fundamentals",
      "Build modern user interfaces",
      "State management with hooks",
      "Routing and navigation"
    ],
    createdAt: "2025-10-01"
  };

  return (
    <div className="min-h-[80vh] p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        {/* Course Header */}
        <div className="relative h-48 md:h-64 bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="mt-2 text-gray-600">Language: {course.language}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">${course.price}</p>
              <p className="text-sm text-gray-600">{course.students} students enrolled</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.whatYoullLearn.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back to Courses
            </button>
            <button
              onClick={() => navigate(`/teacher/courses/edit/${id}`)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;