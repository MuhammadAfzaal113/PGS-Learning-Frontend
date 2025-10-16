import React ,{ useState }from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherNavbar from './TeacherNavbar';
import TeacherBottomBar from './TeacherBottomBar';

const TeacherLayout = () => {

  return (
    <div className="flex h-screen p-3 bg-gray-100">
    {/* Sidebar */}
    <div className="hidden md:block">
        <TeacherSidebar />
    </div>
    {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <TeacherNavbar />
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-4 hide-scrollbar">
          <Outlet />
        </main>
        
        {/* Bottom Bar */}
        <TeacherBottomBar />
      </div>
    </div>
  );
};

export default TeacherLayout;