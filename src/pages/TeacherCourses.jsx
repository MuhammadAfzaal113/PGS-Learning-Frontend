import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coursesData from '../data/courses.json';


const TeacherCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setCourses(coursesData.courses);
  }, []);

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-2xl font-semibold mb-2">No Courses Yet</h2>
      <p className="text-gray-600 mb-6">Start creating your first course and share your knowledge!</p>
      <button
        onClick={() => navigate('/teacher/courses/add')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Your First Course
      </button>
    </div>
  );

  return (
    <div className="min-h-[80vh] p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Courses</h1>
          {courses.length > 0 && (
            <button
              onClick={() => navigate('/teacher/courses/add')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Course
            </button>
          )}
        </div>

        {courses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div 
                  className="h-48 bg-gray-200 relative cursor-pointer"
                  onClick={() => navigate(`/teacher/courses/${course.id}`)}
                >
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/teacher/courses/${course.id}`)}
                  >
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.students} students</span>
                    <div className="space-x-2">
                      <button 
                        onClick={() => navigate(`/teacher/courses/${course.id}`)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => navigate(`/teacher/courses/edit/${course.id}`)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourses;