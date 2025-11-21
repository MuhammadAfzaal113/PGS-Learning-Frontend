import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { protectedAPI } from "../../../api/axiosClient";
import Loader from "../../../components/common/Loader";

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    email: ""
  });

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const res = await protectedAPI.authMe();

      const data = res?.user || {};

      setUserInfo(data);

      setFormData({
        full_name: data.full_name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        address: data.address?.line1 || "",
        city: data.address?.city || "",
        state: data.address?.state || "",
        zip_code: data.address?.postal_code || "",
      });

    } catch (err) {
      console.error("Failed to fetch user info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
      };

      const res = await protectedAPI.updateUserInfo(payload);

      setIsEditing(false);
      fetchUserInfo();

    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 flex justify-center h-full items-center text-gray-600">
        <Loader />
      </div>
    );

  return (
    <div>
      {/* NAME */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            disabled={!isEditing}
            value={formData.full_name}
            onChange={(e) => handleInputChange("full_name", e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
              }`}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            disabled
            value={formData.email}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>
      </div>

      {/* PHONE */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="text"
          disabled={!isEditing}
          value={formData.phone_number}
          onChange={(e) => handleInputChange("phone_number", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
            }`}
        />
      </div>

      {/* ADDRESS */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Address</label>
        <input
          type="text"
          disabled={!isEditing}
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
            }`}
        />
      </div>

      {/* CITY & STATE */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            disabled={!isEditing}
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
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
            className={`w-full px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
              }`}
          />
        </div>
      </div>

      {/* ZIP CODE */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Zip Code</label>
        <input
          type="text"
          disabled={!isEditing}
          value={formData.zip_code}
          onChange={(e) => handleInputChange("zip_code", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-100"
            }`}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
        className="px-8 py-2.5 bg-[#664286] text-white rounded-lg hover:bg-[#5a356d] transition-colors"
      >
        {isEditing ? "Update Info" : "Edit Info"}
      </button>
    </div>
  );
};

export default UserInfo;
