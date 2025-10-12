import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TeacherSidebar = () => {
  const location = useLocation();
  const [search,setsearch] = React.useState('');
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
    <div className="bg-black w-64 shadow-lg rounded-lg border border-gray-300" style={{ height: '91vh'}}>
        <div className="p-4">
            <h2 className="text-2xl font-bold text-white">Pro Genius Student</h2>
        </div>
        <div className="block sm:hidden">
                           <input
                    type="text"
                    value={search}
                    onChange={e => setsearch(e.target.value)}
                    placeholder="Search something..."
                    className="bg-white text-gray-800 ml-10 px-2 py-3 border rounded"
                />
                        </div>
        <nav className="mt-4 p-5">
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-4 py-3 text-white hover:bg-[#924dbf] hover:text-white rounded-lg border ${
                        location.pathname === link.path ? 'bg-[#7338a0] border-[#7338a0]' : 'border-transparent'
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