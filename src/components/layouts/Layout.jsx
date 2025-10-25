import React ,{ useState }from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomBar from './BottomBar';

const Layout = () => {

  return (
    <div className="flex h-screen p-3 bg-gray-100">
    {/* Sidebar */}
    <div className="hidden md:block">
        <Sidebar />
    </div>
    {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />
        
        {/* Main content */}
        {/* Add extra bottom padding so a fixed BottomBar doesn't cover page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto pb-28 hide-scrollbar">
          <Outlet />
        </main>
        
        {/* Bottom Bar */}
        <BottomBar />
      </div>
    </div>
  );
};

export default Layout;