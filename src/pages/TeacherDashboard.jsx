import React from 'react';
import StudentsTable from '../components/teacher/StudentsTable';
import CoursesTable from '../components/teacher/CoursesTable';
import PaymentsTable from '../components/teacher/PaymentsTable';

const TeacherDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Stats Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl font-bold mt-2">150</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Active Courses</h3>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$12,450</p>
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