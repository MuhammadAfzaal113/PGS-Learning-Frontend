import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../../features/courses/coursesApi';
import Loader from '../../../components/common/Loader';

const AddCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    title: "",
    language: "",
    description: "",
    learning_outcomes: "",
    price: 0,
    coverImage: null,
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));
    }
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCourse(formData)).unwrap();
      navigate("/teacher/courses/addTwo");
    } catch (err) {
      console.error("❌ Failed to add course:", err);
      // alert(err?.message || "Error adding course");
    }
  };

  return (
    <div className="  p-6">
      <div className="mx-auto min-h-[80vh] bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl text-black font-bold mb-6">Add Course</h1>
        <p className="mb-6 text-gray-600">
          Please provide all of the information below to add your course.
        </p>

        {loading ? (
          <div className="flex h-full justify-center py-10">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="mt-1 text-black bg-gray-100 flex justify-center h-[15vh] w-[20vh] px-6 pt-5 pb-6 border-2 rounded">
                <div className="space-y-1 text-center">
                  {formData.coverImage ? (
                    <div className="mb-4">
                      <img
                        src={URL.createObjectURL(formData.coverImage)}
                        alt="Preview"
                        className="mx-auto h-auto w-auto"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-4xl">↑</span>
                    </div>
                  )}
                  <div className="flex text-sm bg-gray-100 text-gray-600">
                    <label className="relative cursor-pointer bg-gray-100 rounded-md font-medium text-black">
                      <span>Upload Image</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Language, Title, Price */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {/* Language */}
              <div className="flex-1 bg-white mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-black mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              {/* Course Title */}
              <div className="flex-1 mb-4 sm:mb-0">
                <label className="block bg-white text-sm font-medium text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-black bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Write here"
                />
              </div>

              {/* Course Price */}
              <div className="flex-1 bg-white">
                <label className="block text-sm font-medium text-black mb-2">
                  Course Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border text-black bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write here"
              />
            </div>

            {/* What You'll Learn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What You'll Learn?
              </label>
              <textarea
                name="learning_outcomes"
                value={formData.learning_outcomes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md text-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write here"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/teacher/courses")}
                className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#7338a0] text-white rounded-md hover:bg-[#622d8a]"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
