import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { logout } from '../../features/auth/authSlice'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';


const Navbar = () => {
    const navigate = useNavigate();
    const [search, setsearch] = React.useState('');
      const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [sidebarOpen, setsidebarOpen] = React.useState(false);
      const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
        const handleMenuClose = () => setAnchorEl(null);

    const location = useLocation();
    const dispatch = useDispatch();

    const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleMenuClose();
    try {
      dispatch(logout());
    } catch (e) {
      try {
        localStorage.clear();
      } catch (_) {}
    }
    navigate("/login");
  };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/courses', label: 'Courses', icon: '📚' },
        { path: '/quizes', label: 'Quizzes', icon: '✍️' },
        { path: '/students', label: 'Students', icon: '👥' },
        { path: '/my_team', label: 'My Team', icon: '👥' },
        { path: '/payments', label: 'Payments', icon: '💰' },
        { path: '/rating_and_reviews', label: 'Ratings & Reviews', icon: '⭐' },
        { path: '/permissions', label: 'Permissions', icon: '🔒' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
    ];


    return (
        <nav className="pb-2">
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
                    <h1 className="text-xl font-bold text-gray-800">Welcome Back!</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className='hidden sm:block'>
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm overflow-hidden">
                        <NotificationsNoneOutlinedIcon sx={{ fontSize: 20 }} />
                    </button>

                    <div className="relative">
                        {/* <button
                            className="flex w-10 h-10 items-center justify-center space-x-2 bg-[#D9D9D9] rounded-lg"
                            onClick={() => setDropdownOpen(prev => !prev)}
                        >
                            <PersonOutlinedIcon sx={{ fontSize: 20 }} />
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
                                                // dispatch logout reducer which clears state and localStorage
                                                try {
                                                    dispatch(logout())
                                                } catch (e) {
                                                    // if dispatch fails for any reason, fallback to clearing storage
                                                    try { localStorage.clear() } catch (_) {}
                                                }
                                                navigate('/login');
                                            }}
                                        >
                                            Logout
                                        </button>
                            </div>
                        )} */}
                         <IconButton
        onClick={handleMenuOpen}
        sx={{
          backgroundColor: "#D9D9D9",
          borderRadius: "8px",
          width: "40px",
          height: "40px",
          "&:hover": { backgroundColor: "#C0C0C0" },
        }}
      >
        <PersonOutlinedIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 120,
          },
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
                    </div>
                </div>
            </div>
        </nav>
    );


};

export default Navbar;