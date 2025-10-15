import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';





const TeacherNavbar = () => {
    const navigate = useNavigate();
    const [search, setsearch] = React.useState('');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [sidebarOpen, setsidebarOpen] = React.useState(false);

    const location = useLocation();

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
        <nav className="p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Show sidebar only on small screens */}
                    <div className="block sm:hidden relative">


                        <button
                            className="p-2 bg-black rounded-full"
                            onClick={() => setsidebarOpen(prev => !prev)}
                        >
                            <span className="text-xl">⋮</span>
                        </button>
                        {sidebarOpen &&
                            <div className="fixed inset-0 z-50 flex">
                                {/* Overlay */}
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-40"
                                    onClick={() => setsidebarOpen(false)}
                                />
                                {/* Sidebar */}
                                <div className="relative z-50">
                                    <div className="bg-black w-64 shadow-lg rounded-lg border border-gray-300" style={{ height: '91vh' }}>
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
                                                    className={`flex items-center px-4 py-3 text-white hover:bg-[#924dbf] hover:text-white rounded-lg border ${location.pathname === link.path ? 'bg-[#7338a0] border-[#7338a0]' : 'border-transparent'
                                                        }`}
                                                    onClick={() => {
                                                        if (sidebarOpen) setsidebarOpen(false);
                                                    }}
                                                >
                                                    <span className="mr-3">{link.icon}</span>
                                                    <span>{link.label}</span>
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Welcome Back</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className='hidden sm:block'>
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button className="p-2 bg-gray-100 rounded-full">
                        <span className="text-xl">🔔</span>
                    </button>

                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 bg-gray-100 rounded-full p-2"
                            onClick={() => setDropdownOpen(prev => !prev)}
                        >
                            <span className="text-xl">👤</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg z-10">
                                <button
                                    className="block w-full text-left hover:bg-gray-100 hover:text-black"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        navigate('/profile');
                                    }}
                                >
                                    Profile
                                </button>
                                <button
                                    className="block w-full text-left hover:bg-gray-100 hover:text-black"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        try {
                                            localStorage.removeItem('user');
                                        } catch (e) {
                                            // ignore storage errors
                                        }
                                        navigate('/login');
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );


};

export default TeacherNavbar;