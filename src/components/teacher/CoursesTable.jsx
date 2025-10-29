import React, { useEffect, useMemo } from "react";
import DataTable from "../../components/common/DataTable";

const CoursesTable = ({ courses = [], loading = false }) => {
  // 🔹 Log when data updates
  useEffect(() => {
    if (courses?.length > 0) {
      console.log("✅ Courses received from Dashboard:", courses);
    } else {
      console.log("⚠️ No courses received yet");
    }
  }, [courses]);

  // 🔹 Helper: format date like "Sep 28, 2025"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // 🔹 Format fetched courses
  const formattedCourses = useMemo(() => {
    return courses?.map((course) => ({
      id: course.id?.slice(-5) || "-", // last 5 chars of UUID
      name: course.title || "Untitled",
      students: course.students_count || "0",
      addedOn: formatDate(course.created_at),
      status: course.status || "Active",
      price: course.price ? `$${parseFloat(course.price).toFixed(2)}` : "$0.00",
    })) || [];
  }, [courses]);

  // 🔹 Table Columns
  const coursesColumns = [
    { header: "ID", key: "id", className: "text-[#424242]" },
    { header: "Name", key: "name", className: "text-[#424242]" },
    { header: "Students", key: "students", className: "text-[#424242]" },
    { header: "Added On", key: "addedOn", className: "text-[#424242]" },
    // { header: "Price", key: "price", className: "text-[#424242]" },
    {
      header: "Status",
      key: "status",
      render: (row) => {
        const statusColors = {
          Active: "bg-green-100 text-green-700",
          "In-Active": "bg-gray-100 text-gray-700",
          "In-Approval": "bg-yellow-100 text-yellow-700",
          Rejected: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              statusColors[row.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <DataTable
      title="Courses"
      columns={coursesColumns}
      data={formattedCourses}
      showSearch={false}
      showSortBy={false}
      showStatus={false}
      showAddButton={false}
      showPagination={false}
      addButtonText="Add Course"
      searchPlaceholder="Search"
      loading={loading}
    />
  );
};

export default CoursesTable;
