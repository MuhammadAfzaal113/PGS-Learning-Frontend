import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user); // Fetch auth/me data from Redux
  const tenant = useSelector((state) => state.auth.tenant); // if stored
  console.log("User Info:", user, tenant);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+92",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    instituteCode: "",
    instituteName: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || "",
        email: user.email || "",
        phone: user.phone_number || "",
        countryCode: "+92", // default
        address: user.address?.line1 || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zipCode: user.address?.postal_code || "",
        instituteCode: tenant?.id || "",
        instituteName: tenant?.tenant_name || "",
      });
    }
  }, [user, tenant]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div>
      {/* ---------- ROW 1 ---------- */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            disabled={!isEditing}
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            disabled={!isEditing}
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* ---------- PHONE ---------- */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Phone</label>
        <div className="flex gap-4">
          <select
            disabled={!isEditing}
            value={formData.countryCode}
            onChange={(e) => handleInputChange("countryCode", e.target.value)}
            className={`w-24 px-3 py-2 border border-neutral-300 rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          >
            <option value="+92">+92</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>

          <input
            type="text"
            disabled={!isEditing}
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`flex-1 px-4 py-2 border border-neutral-300 rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* ---------- ADDRESS ---------- */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Address</label>
        <input
          type="text"
          disabled={!isEditing}
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${
            isEditing ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>

      {/* ---------- CITY / STATE ---------- */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            disabled={!isEditing}
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            disabled={!isEditing}
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* ---------- ZIP ---------- */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Zip Code</label>
        <input
          type="text"
          disabled={!isEditing}
          value={formData.zipCode}
          onChange={(e) => handleInputChange("zipCode", e.target.value)}
          className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${
            isEditing ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>

      {/* ---------- TENANT INFO (READ ONLY ALWAYS) ---------- */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Institute Code
          </label>
          <input
            type="text"
            disabled
            value={formData.instituteCode}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Institute Name
          </label>
          <input
            type="text"
            disabled
            value={formData.instituteName}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg bg-gray-100"
          />
        </div>
      </div>

      {/* ---------- BUTTON ---------- */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="px-8 py-2.5 bg-[#664286] text-white rounded-lg hover:bg-[#5a356d] transition-colors font-medium"
      >
        {isEditing ? "Update Info" : "Edit Info"}
      </button>
    </div>
  );
};

export default UserInfo;
