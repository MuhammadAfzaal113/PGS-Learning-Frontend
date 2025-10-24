import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Sidebar = () => {
  const location = useLocation();
  const [search, setSearch] = React.useState('');

  const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: <DashboardOutlinedIcon /> },
  { path: '/courses', label: 'Courses', icon: <TrendingUpOutlinedIcon /> },
  { path: '/institutes', label: 'Institutes', icon: <AdminPanelSettingsOutlinedIcon /> },
  { path: '/quizes', label: 'Quizzes', icon: <AssignmentOutlinedIcon /> },
  { path: '/teachers', label: 'Teachers', icon: <ContactsOutlinedIcon /> },
  { path: '/students', label: 'Students', icon: <SchoolOutlinedIcon /> },
  { path: '/my_team', label: 'My Team', icon: <PeopleAltOutlinedIcon /> },
  { path: '/payments', label: 'Payments', icon: <PaymentOutlinedIcon /> },
  { path: '/rating_and_reviews', label: 'Ratings & Reviews', icon: <StarBorderOutlinedIcon /> },
  { path: '/subscriptions', label: 'Subscriptions', icon: <CardMembershipOutlinedIcon /> },
  { path: '/permissions', label: 'Permissions', icon: <SignpostOutlinedIcon /> },
  { path: '/settings', label: 'Settings', icon: <SettingsOutlinedIcon /> },
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
            className={`flex items-center h-[40px] w-full py-3 pl-2 text-white hover:bg-[#924dbf] hover:text-white rounded-lg border ${
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

export default Sidebar;
