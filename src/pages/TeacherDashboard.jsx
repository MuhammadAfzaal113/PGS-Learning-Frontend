import React from 'react';
import StudentsTable from '../components/teacher/StudentsTable';
import CoursesTable from '../components/teacher/CoursesTable';
import PaymentsTable from '../components/teacher/PaymentsTable';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

const TeacherDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
        {/* Stats Cards */}
        <div className="rounded-2xl p-6 shadow-lg text-black bg-white transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#C24C99] hover:to-[#664286]">
          {/* Top Section - Icon and Percentage */}
          <div className="flex items-center mb-8 gap-2">
            <div className="h-10 w-10 bg-[#F5F5F5] hover:bg-white rounded-lg flex items-center justify-center">
              <SchoolOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUpOutlinedIcon sx={{ fontSize: 16 }} />
              <span>1.3%</span>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div>
            <p className="text-[32px] font-semibold leading-none mb-1">42K</p>
            <h3 className="text-base font-normal opacity-90">Total Students</h3>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-black bg-white transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#C24C99] hover:to-[#664286]">
                 <div className="flex items-center mb-8 gap-2">
            <div className="h-10 w-10 bg-[#F5F5F5] hover:bg-white rounded-lg flex items-center justify-center">
              <AutoStoriesOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUpOutlinedIcon sx={{ fontSize: 16 }} />
              <span>1.3%</span>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div>
            <p className="text-[32px] font-semibold leading-none mb-1">42</p>
            <h3 className="text-base font-normal opacity-90">Total Courses</h3>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-black bg-white transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#C24C99] hover:to-[#664286]">
          {/* Top Section - Icon and Percentage */}
          <div className="flex items-center mb-8 gap-2">
            <div className="h-10 w-10 bg-[#F5F5F5] hover:bg-white rounded-lg flex items-center justify-center">
                <AutoStoriesOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUpOutlinedIcon sx={{ fontSize: 16 }} />
              <span>1.3%</span>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div>
            <p className="text-[32px] font-semibold leading-none mb-1">12</p>
            <h3 className="text-base font-normal opacity-90">Active Courses</h3>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-black bg-white transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#C24C99] hover:to-[#664286]">
                   <div className="flex items-center mb-8 gap-2">
            <div className="h-10 w-10 bg-[#F5F5F5] hover:bg-white rounded-lg flex items-center justify-center">
              <MenuBookOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUpOutlinedIcon sx={{ fontSize: 16 }} />
              <span>1.3%</span>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div>
            <p className="text-[32px] font-semibold leading-none mb-1">54</p>
            <h3 className="text-base font-normal opacity-90">Total Students</h3>
          </div>
        </div>

        <div className="rounded-2xl p-6 shadow-lg text-black bg-white transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#C24C99] hover:to-[#664286]">
              <div className="flex items-center mb-8 gap-2">
            <div className="h-10 w-10 bg-[#F5F5F5] hover:bg-white rounded-lg flex items-center justify-center">
              <PaymentsOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUpOutlinedIcon sx={{ fontSize: 16 }} />
              <span>1.3%</span>
            </div>
          </div>

          {/* Bottom Section - Stats */}
          <div>
            <p className="text-[32px] font-semibold leading-none mb-1">$7868.00</p>
            <h3 className="text-base font-normal opacity-90">Active Subscription</h3>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* First row - two tables side by side on large screens */}
        <div>
          <StudentsTable />
        </div>
        <div>
          <CoursesTable />
        </div>

        {/* Second row - full width below both */}
        <div className="lg:col-span-2">
          <PaymentsTable />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
