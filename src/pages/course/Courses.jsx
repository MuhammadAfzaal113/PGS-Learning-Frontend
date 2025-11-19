import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/courses/coursesApi";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: courses, loading, error } = useSelector(
    (state) => state.courses
  );

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 5 rows per page

  // 🔹 Fetch data dynamically on page change
  useEffect(() => {
    dispatch(fetchCourses({ index: currentPage - 1, offset: itemsPerPage }));
  }, [dispatch, currentPage]);

  const coursesColumns = [
    { header: "ID", key: "id", className: "text-[#424242]", render: (r) => r.id?.slice(-5) || "—" , sortable: true},
    { header: "Name", key: "title", className: "text-[#424242]", searchKey: "title" },
    { header: "Topics", key: "topics", className: "text-[#424242]" },
    { header: "Total Hours", key: "hours", className: "text-[#424242]" },
    {
      header: "Price",
      key: "price",
      render: (row) => `$${parseFloat(row.price || 0).toFixed(2)}`,
      className: "text-[#424242]",
      sortable: true
    },
    { header: "Students", key: "students", className: "text-[#424242]" },
    {
      header: "Ratings",
      key: "rating",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{row.rating || "—"}</span>
        </div>
      ),
    },
    {
      header: "Added On",
      key: "created_at",
      render: (row) => {
        if (!row.created_at) return "—";
        const date = new Date(row.created_at);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      },
      className: "text-[#424242]",
    },
    {
      header: "Status",
      key: "status",
      render: (row) => {
        const statusColors = {
          Active: "bg-green-100 text-[#424242]",
          "In-Active": "bg-gray-100 text-[#424242]",
          "In-Approval": "bg-yellow-100 text-[#424242]",
          Rejected: "bg-red-100 text-[#424242]",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs ${statusColors[row.status] || "bg-gray-100 text-[#424242]"
              }`}
          >
            {row.status || "Pending"}
          </span>
        );
      },
    },
  ];

  if (loading)
    return (
      <div className="p-6 flex justify-center h-full items-center text-gray-600">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        <p>⚠️ Failed to load courses: {error}</p>
      </div>
    );

  return (
    <div className="p-6">
      <div className="h-full bg-white rounded-lg shadow">
        <DataTable
          title="Courses"
          columns={coursesColumns}
          data={courses.results}
          showSearch={true}
          showSortBy={true}
          showStatus={true}
          showAddButton={true}
          addButtonText="Add Course"
          onAdd={() => navigate("/teacher/courses/add")}
          searchPlaceholder="Search"
        />
      </div>

      {/* External Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={courses.total}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Courses;
