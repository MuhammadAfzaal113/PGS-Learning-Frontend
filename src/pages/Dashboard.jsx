import React, { useEffect, useState } from "react";
import StudentsTable from '../components/teacher/StudentsTable';
import CoursesTable from '../components/teacher/CoursesTable';
import PaymentsTable from '../components/teacher/PaymentsTable';
import PaymentsChart from '../components/teacher/PaymentChart';
import MostSellingCourse from '../components/teacher/MostSellingCourse';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesApi';
import { protectedAPI } from '../api/axiosClient';
import Loader from "../components/common/Loader";
import { AuthMe } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: courseData = {}, loading } = useSelector((state) => state.courses || {});
  const courses = courseData.results || [];
  const [students, setStudents] = useState([]);

  // 🔹 Dashboard stats state
  const [stats, setStats] = useState({
    total_students: 0,
    total_courses: 0,
    total_active_courses: 0,
    total_enrolled_students: 0,
    most_selling_courses: [],
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  // 🔹 Fetch courses & dashboard stats
  useEffect(() => {
    dispatch(fetchCourses({ index: 0, offset: 5 }));
    dispatch(AuthMe());

    const fetchAPIs = async () => {
      try {
        setStatsLoading(true);
        setStatsError("");

        const payload = { index: 0, offset: 4 };

        const [statsRes, studentsRes] = await Promise.all([
          protectedAPI.getDashboardStats(),
          protectedAPI.getStudents(payload)
        ]);

        console.log("Students API Response:", statsRes);
        setStudents(studentsRes?.data || []);
        if (statsRes?.success) {
          setStats(statsRes?.results);
        } else {
          setStatsError(statsRes.data?.message || "Failed to fetch stats");
        }
      } catch (err) {
        setStatsError(err.message || "Failed to fetch stats");
      } finally {
        setStatsLoading(false);
      }
    };

    fetchAPIs();
  }, [dispatch]);

  if (statsLoading) {
    return (
      <div className="p-6 flex justify-center h-full items-center text-gray-600">
        <Loader />
      </div>);
  }

  // if (statsError) {
  //   return <div className="p-6 text-center text-red-500">⚠️ {statsError}</div>;
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
        <StatCard
          icon={<SchoolOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />}
          value={stats.total_students}
          label="Total Students"
        />
        <StatCard
          icon={<AutoStoriesOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />}
          value={stats.total_courses}
          label="Total Courses"
        />
        <StatCard
          icon={<AutoStoriesOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />}
          value={stats.total_active_courses}
          label="Active Courses"
        />
        <StatCard
          icon={<MenuBookOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />}
          value={stats.total_enrolled_students}
          label="Enrolled Students"
        />
        <StatCard
          icon={<PaymentsOutlinedIcon className="text-black" sx={{ fontSize: 20 }} />}
          value={stats.total_active_subscription ? stats.total_active_subscription : 0}
          label="Active Subscription"
        />
      </div>

      {/* Most Selling Courses & Payments Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 h-[286px]">
          <MostSellingCourse courses={stats.most_selling_courses} />
        </div>
        <div>
          <PaymentsChart />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StudentsTable students={students} loading={loading} />
        <CoursesTable courses={courses} loading={loading} />
        <div className="lg:col-span-2">
          <PaymentsTable />
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────
// 🔹 StatCard Component
// ───────────────────────────────
const StatCard = ({ icon, value, label }) => (
  <div className="rounded-2xl p-6 shadow-lg text-black bg-white transition-all duration-300 hover:text-white hover:bg-gradient-to-b hover:from-[#C24C99] hover:to-[#664286]">
    <div className="flex items-center mb-8 gap-2">
      <div className="h-10 w-10 bg-[#F5F5F5] hover:bg-white rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex items-center gap-1 text-sm">
        <TrendingUpOutlinedIcon sx={{ fontSize: 16 }} />
        <span>1.3%</span>
      </div>
    </div>
    <div>
      <p className="text-[32px] font-semibold leading-none mb-1">{value}</p>
      <h3 className="text-base font-normal opacity-90">{label}</h3>
    </div>
  </div>
);

export default Dashboard;
