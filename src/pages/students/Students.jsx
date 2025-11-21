import React, { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { protectedAPI } from "../../api/axiosClient";
import Avatar from "../../components/common/Avatar";
import Loader from "../../components/common/Loader";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

    // 🔹 Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);

       const payload = {
        index: currentPage - 1,
        offset: itemsPerPage,
      };

      const res = await protectedAPI.getStudents(payload);
      console.log("Fetched students:", res);

      // Adjust based on API response structure
      setStudents(res?.data || []); 
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const studentsColumns = [
    { header: 'ID', key: 'id', className: 'text-[#424242]', render: (r) => r.id?.slice(-5) || "—" , sortable: true },
    {
      header: 'Name',
      key: 'full_name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.avatar} name={row.full_name} />
          <span className="text-[#424242]">{row.full_name}</span>
        </div>
      ),
      searchKey: 'name',
    },
    { header: 'Courses Purchased', key: 'course_enrollment', className: 'text-[#424242]', searchKey: 'courses' },
    { header: 'Email', key: 'email', className: 'text-[#424242]', searchKey: 'email' },
    { header: 'Phone', key: 'phone', className: 'text-[#424242]' },
    { header: 'Location', key: 'city', className: 'text-[#424242]', sortable: true },
    {
      header: 'Registered On', key: 'created_at', render: (row) => {
        if (!row.created_at) return "—";
        const date = new Date(row.created_at);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }, className: 'text-[#424242]'
    },
    {
      header: '',
      key: 'actions',
      render: () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="h-full bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 flex justify-center h-full items-center text-gray-600">
                  <Loader />
          </div>
        ) : (
          <DataTable
            title="Students"
            columns={studentsColumns}
            data={students}
            showSearch={true}
            showSortBy={true}
            searchPlaceholder="Search"
            showPagination={true}
          />
        )}
      </div>
    </div>
  );
};

export default Students;
