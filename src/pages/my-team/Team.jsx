import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";
import { getTeam } from "../../api/axiosClient";

const Team = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState({ results: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

// 🔹 Fetch team users dynamically on page change
useEffect(() => {
  async function fetchMembers() {
    try {
      setLoading(true);
      setError("");

      const payload = {
        index: currentPage - 1,
        offset: itemsPerPage,
      };

      const res = await getTeam(payload);
      console.log("Team members response:", res);

      setMembers({
        results: res.results || [],
        total: res.total || 0,
      });
    } catch (err) {
      setError(err.message || "Failed to load team members.");
    } finally {
      setLoading(false);
    }
  }

  fetchMembers();
}, [currentPage]);


  // -----------------------
  // 🔹 Table Columns
  // -----------------------
  const teamColumns = [
     { header: "ID", key: "id", className: "text-[#424242]", render: (r) => r.id?.slice(-5) || "—" },

    {
      header: "Name",
      key: "full_name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gray-200 flex items-center justify-center">
            {row.avatar || "👤"}
          </span>
          <span className="text-[#424242]">{row.full_name}</span>
        </div>
      ),
    },

    { header: "Email", key: "email", className: "text-[#424242]" },
    { header: "Phone", key: "phone", className: "text-[#424242]" },
    { header: "Location", key: "location", className: "text-[#424242]" },

    {
      header: "Registered On",
      key: "created_at",
      render: (row) => {
        if (!row.created_at) return "—";
        const date = new Date(row.created_at);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
      className: "text-[#424242]",
    },

    {
      header: "",
      key: "actions",
      render: () => (
        <button className="text-gray-400 hover:text-gray-600">⋮</button>
      ),
    },
  ];

  // -----------------------
  // 🔹 Loading + Error states
  // -----------------------
  if (loading)
    return (
      <div className="p-6 flex justify-center h-full items-center text-gray-600">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        <p>⚠️ Failed to load team: {error}</p>
      </div>
    );

  // -----------------------
  // 🔹 Render
  // -----------------------
  return (
    <div className="p-6">
      <div className="h-full bg-white rounded-lg shadow">
        <DataTable
          title="My Team"
          columns={teamColumns}
          data={members.results}
          showSearch={true}
          showSortBy={true}
          showStatus={true}
          showAddButton={true}
          addButtonText="Add Team Member"
          onAdd={() => navigate("/teacher/my_team/add")}
          searchPlaceholder="Search"
        />
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={members.total}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Team;
