import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateQuizDrawer from "../components/quiz/CreateQuizDrawer";

const ViewCourse = () => {
  const [topics, setTopics] = useState([
    {
      id: Date.now(),
      title: "",
      description: "",
      video: null,
      document: null,
      test: null,
      quiz: null,
    },
  ]);

  const [quizDrawerOpen, setQuizDrawerOpen] = useState(false);
  const [quizTopicId, setQuizTopicId] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Hidden file input refs
  const videoInputRef = useRef({});
  const documentInputRef = useRef({});
  const testInputRef = useRef({});

  // ➕ Add new topic
  const handleAddTopic = () => {
    setTopics((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        title: "",
        description: "",
        video: null,
        document: null,
        test: null,
        quiz: null,
      },
    ]);
  };

  // 📹 Handle file uploads
  const handleFileSelect = (topicId, type, file) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, [type]: file } : t))
    );
  };

  // 🧾 Handle upload clicks (video/document/test)
  const handleUploadClick = (topicId, type) => {
    let inputRef = null;

    if (type === "video") inputRef = videoInputRef.current[topicId];
    if (type === "document") inputRef = documentInputRef.current[topicId];
    if (type === "test") inputRef = testInputRef.current[topicId];

    if (inputRef) {
      // ensure ref is ready before click
      setTimeout(() => inputRef.click(), 0);
    } else {
      console.warn(`${type} input ref not found for topic ${topicId}`);
    }
  };

  // 🧮 Quiz Drawer
  const handleCreateQuiz = (topicId) => {
    setQuizTopicId(topicId);
    setQuizDrawerOpen(true);
  };

  const handleCreateQuizSubmit = async (payload) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === quizTopicId ? { ...t, quiz: payload } : t))
    );
    setQuizDrawerOpen(false);
    setQuizTopicId(null);
  };

  const handleCancel = () => console.log("Cancel clicked");
  const handleCreateCourse = () => console.log("Create course clicked", topics);

  return (
    <div className="min-h-[80vh] p-6">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Course</h2>

        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Course Content
          </h3>

          {topics.map((topic, index) => (
            <div key={topic.id} className="mb-2">
              <h4 className="text-sm font-semibold text-purple-700 mb-4">
                Topic {index + 1}
              </h4>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Title
                  </label>
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) =>
                      setTopics((prev) =>
                        prev.map((t) =>
                          t.id === topic.id
                            ? { ...t, title: e.target.value }
                            : t
                        )
                      )
                    }
                    placeholder="Enter topic title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={topic.description}
                    onChange={(e) =>
                      setTopics((prev) =>
                        prev.map((t) =>
                          t.id === topic.id
                            ? { ...t, description: e.target.value }
                            : t
                        )
                      )
                    }
                    placeholder="Enter topic description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                {/* Upload Video */}
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload lecture video
                    </label>
                  </div>
                  <div className="flex items-center gap-4 pr-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-black rounded flex items-center justify-center">
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">
                        {topic.video ? topic.video.name : "No video uploaded"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleUploadClick(topic.id, "video")}
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      ref={(el) => (videoInputRef.current[topic.id] = el)}
                      onChange={(e) =>
                        handleFileSelect(topic.id, "video", e.target.files[0])
                      }
                    />
                  </div>
                </div>

                {/* Upload Document */}
                <div className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload lecture document
                    </label>
                  </div>
                  <div>
                    <button
                      onClick={() => handleUploadClick(topic.id, "document")}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload
                    </button>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      ref={(el) => (documentInputRef.current[topic.id] = el)}
                      onChange={(e) =>
                        handleFileSelect(topic.id, "document", e.target.files[0])
                      }
                    />
                    {topic.document && (
                      <p className="text-xs text-gray-600 mt-1">
                        {topic.document.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Upload Test */}
                <div className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload lecture test
                    </label>
                  </div>
                  <div>
                    <button
                      onClick={() => handleUploadClick(topic.id, "test")}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload
                    </button>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      ref={(el) => (testInputRef.current[topic.id] = el)}
                      onChange={(e) =>
                        handleFileSelect(topic.id, "test", e.target.files[0])
                      }
                    />
                    {topic.test && (
                      <p className="text-xs text-gray-600 mt-1">
                        {topic.test.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quiz Buttons */}
                <div className="grid grid-cols-2 gap-4 items-start">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Create quiz
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCreateQuiz(topic.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Create Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <button
              onClick={handleAddTopic}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              <span className="text-lg">+</span>
              <span>Add Another Topic</span>
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCourse}
              className="px-6 py-2.5 bg-[#664286] text-white rounded-lg hover:bg-[#553674] font-medium text-sm"
            >
              Create Course
            </button>
          </div>
        </div>
      </div>

      {/* 🟣 Quiz Drawer */}
      <CreateQuizDrawer
        open={quizDrawerOpen}
        onClose={() => {
          setQuizDrawerOpen(false);
          setQuizTopicId(null);
        }}
        onCreate={handleCreateQuizSubmit}
      />
    </div>
  );
};

export default ViewCourse;
