import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";
import { protectedAPI } from "../../api/axiosClient";
import { useSelector } from "react-redux";
import Avatar from "../../components/common/Avatar";

const Team = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState({ results: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = useSelector((state) => state.auth.user?.user_role);

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
        role
      };

      const res = await protectedAPI.getTeam(payload);
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
     { header: "ID", key: "id", className: "text-[#424242]", render: (r) => r.id?.slice(-5) || "—", sortable: true },

    {
      header: "Name",
      key: "full_name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.avatar} name={row.full_name} />
          <span className="text-[#424242]">{row.full_name}</span>
        </div>
      ),
      searchKey: "full_name",
    },

    { header: "Email", key: "email", className: "text-[#424242]", searchKey: "email" },
    { header: "Phone", key: "phone", className: "text-[#424242]", searchKey: "phone",sortable: true },
    { header: "Location", key: "location", className: "text-[#424242]", searchKey: "location", sortable: true },

    {
      header: "Added On",
      key: "created_at",
      render: (row) => {
        const createdAt = row.company_user?.created_at;  // <-- FIX HERE
        if (!createdAt) return "—";
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
      className: "text-[#424242]",
      sortable: true
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
