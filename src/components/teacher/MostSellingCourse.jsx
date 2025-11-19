import React from "react";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

const MostSellingCourse = ({ courses = [] }) => {
  // Calculate the max enrollment to determine percentage
  const maxEnrollment = Math.max(...courses.map((c) => c.enrollment_count), 1);

  // Generate colors for each course (you can customize)
  const colors = ["#664286", "#C24C99", "#1F2937", "#4B5563", "#10B981"];

  return (
    <div className="bg-white rounded-lg h-full shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Most Selling Courses</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => {
          const percentage = Math.round((course.enrollment_count / maxEnrollment) * 100);
          const color = colors[index % colors.length];
          return (
            <div key={course.id} className="flex items-center gap-4">
              {/* Book Icon */}
              <div className="flex-shrink-0">
                <AutoStoriesOutlinedIcon sx={{ fontSize: 20, color }} />
              </div>

              {/* Course Title */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 truncate">{course.title}</p>
              </div>

              {/* Student Count */}
              <div className="flex-shrink-0 w-12 text-right">
                <span className="text-sm font-medium text-gray-900">{course.enrollment_count}</span>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 max-w-xs">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostSellingCourse;
