import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const MostSellingCourse = () => {
  const courses = [
    { id: 1, title: 'Learning the basics of python', students: 452, percentage: 90, color: '#664286' },
    { id: 2, title: 'Essential tips for arithmetic mean', students: 522, percentage: 95, color: '#C24C99' },
    { id: 3, title: 'How to make ripple tank effect', students: 352, percentage: 70, color: '#1F2937' },
    { id: 4, title: 'Basics of linguistics', students: 445, percentage: 85, color: '#664286' },
    { id: 5, title: 'Brief history of geeks', students: 403, percentage: 75, color: '#C24C99' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Most selling courses</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="flex items-center gap-4">
            {/* Book Icon */}
            <div className="flex-shrink-0">
             <AutoStoriesOutlinedIcon sx={{ fontSize: 20, color: course.color }} />
              {/* <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg> */}
            </div>
            
            {/* Course Title */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">{course.title}</p>
            </div>
            
            {/* Student Count */}
            <div className="flex-shrink-0 w-12 text-right">
              <span className="text-sm font-medium text-gray-900">{course.students}</span>
            </div>
            
            {/* Progress Bar */}
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${course.percentage}%`,
                    backgroundColor: course.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSellingCourse;
