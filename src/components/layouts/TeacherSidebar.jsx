import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TeacherSidebar = () => {
  const location = useLocation();
  const [search, setSearch] = React.useState('');

  const navLinks = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/teacher/courses', label: 'Courses', icon: '📚' },
    { path: '/teacher/quizes', label: 'Quizzes', icon: '✍️' },
    { path: '/teacher/students', label: 'Students', icon: '👥' },
    { path: '/teacher/my_team', label: 'My Team', icon: '👥' },
    { path: '/teacher/payments', label: 'Payments', icon: '💰' },
    { path: '/teacher/rating_and_reviews', label: 'Ratings & Reviews', icon: '⭐' },
    { path: '/teacher/permissions', label: 'Permissions', icon: '🔒' },
    { path: '/teacher/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-black w-56 shadow-lg rounded-lg border border-gray-300 flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="p-4 shrink-0">
        <h4 className="text-[20px]/[100%] font-[600] text-white">
          Pro Genius Student
        </h4>
      </div>

      {/* Search (only visible on small screens) */}
      <div className="block sm:hidden px-4 shrink-0">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search something..."
          className="bg-white text-gray-800 px-2 py-3 border rounded w-full"
        />
      </div>

      {/* Navigation Links (scrollable if needed, scrollbar hidden) */}
      <nav className=" side-nav-container overflow-y-auto hide-scrollbar">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center h-[40px] w-full py-3 text-white hover:bg-[#924dbf] hover:text-white rounded-lg border ${
              location.pathname === link.path
                ? 'bg-[#664286] border-[#664286]'
                : 'border-transparent'
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default TeacherSidebar;
