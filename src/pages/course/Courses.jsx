import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import Loader from "../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../features/courses/coursesApi"; // ✅ use your actual path

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: courses, loading, error } = useSelector((state) => state.courses);

  // 🔹 Fetch courses from Redux when component mounts
  useEffect(() => {
    dispatch(fetchCourses({ index: 0, offset: 10 }));
  }, [dispatch]);

const coursesColumns = [
  {
    header: "ID",
    key: "id",
    className: "text-[#424242]",
    render: (row) => (
      <span>{row.id ? row.id.slice(-5).toUpperCase() : "—"}</span>
    ),
  },
  {
    header: "Name",
    key: "title",
    className: "text-[#424242]",
  },
  { header: "Topics", key: "topics", className: "text-[#424242]" },
  { header: "Total Hours", key: "hours", className: "text-[#424242]" },
  {
    header: "Price",
    key: "price",
    className: "text-[#424242]",
    render: (row) => {
      const price = parseFloat(row.price)
      return isNaN(price) ? "—" : `$${price.toFixed(2)}`
    },
  },
  { header: "Students", key: "students", className: "text-[#424242]" },
  {
    header: "Ratings",
    key: "rating",
    render: (row) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span>{row?.rating}</span>
      </div>
    ),
  },
  {
    header: "Added On",
    key: "created_at",
    className: "text-[#424242]",
    render: (row) => {
      if (!row.created_at) return "—"
      const date = new Date(row.created_at)
      const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      return formatted // e.g., "Sep 27, 2025"
    },
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
      }
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            statusColors[row.status] || "bg-gray-100 text-[#424242]"
          }`}
        >
          {row.status || "Pending"}
        </span>
      )
    },
  },
  {
    header: "",
    key: "actions",
    render: () => (
      <button className="text-gray-400 hover:text-gray-600">⋮</button>
    ),
  },
]


  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-2xl font-semibold mb-2">No Courses Yet</h2>
      <p className="text-gray-600 mb-6">
        Start creating your first course and share your knowledge!
      </p>
      <button
        onClick={() => navigate("/teacher/courses/add")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Create Your First Course
      </button>
    </div>
  );

  // Loading and error states
  if (loading) {
    return (
      <div className="p-6 flex justify-center h-full items-center text-gray-600">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>⚠️ Failed to load courses: {error}</p>
      </div>
    );
  }

  // Render table or empty state
  return (
    <div className="p-6">
      {courses?.length === 0 ? (
        <EmptyState />
      ) : (
        <DataTable
          title="Courses"
          columns={coursesColumns}
          data={courses}
          showSearch={true}
          showSortBy={true}
          showStatus={true}
          showAddButton={true}
          addButtonText="Add Course"
          onAdd={() => navigate("/teacher/courses/add")}
          searchPlaceholder="Search"
          showPagination={true}
        />
      )}
    </div>
  );
};

export default Courses;
