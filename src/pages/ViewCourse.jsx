import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateQuizDrawer from "../components/quiz/CreateQuizDrawer";

const ViewCourse = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
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

  const handleAddTopic = () => {
    setTopics([
      ...topics,
      {
        id: topics.length + 1,
        title: "",
        description: "",
        video: null,
        document: null,
        test: null,
        quiz: null,
      },
    ]);
  };

  const handleVideoUpload = (topicId) =>
    console.log("Upload video for topic:", topicId);
  const handleDocumentUpload = (topicId) =>
    console.log("Upload document for topic:", topicId);
  const handleTestUpload = (topicId) =>
    console.log("Upload test for topic:", topicId);

  const handleCreateQuiz = (topicId) => {
    setQuizTopicId(topicId);
    setQuizDrawerOpen(true);
  };

  const handleCreateQuizSubmit = async (payload) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === quizTopicId ? { ...t, quiz: payload } : t))
    );
    setQuizDrawerOpen(false);
  };

  const handleAssignQuiz = (topicId) =>
    console.log("Assign quiz for topic:", topicId);
  const handleDeleteVideo = (topicId) =>
    console.log("Delete video for topic:", topicId);
  const handleCancel = () => console.log("Cancel clicked");
  const handleCreateCourse = () =>
    console.log("Create course clicked", topics);

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] p-6">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Course</h2>

        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Course Content
          </h3>

          {topics.map((topic, index) => (
            <div key={topic.id} className="mb-8">
              <h4 className="text-sm font-semibold text-purple-700 mb-4">
                Topic {index + 1}
              </h4>

              <div className="space-y-4">
                {/* Topic Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Title
                  </label>
                  <input
                    type="text"
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
                    placeholder="Enter topic description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>

                {/* Upload lecture video */}
                <div className="flex items-center justify-between py-3 w-[50%]">
                  <label className="text-sm text-gray-700">
                    Upload lecture video
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span className="text-xs">Video title</span>
                    </div>
                    <button
                      onClick={() => handleDeleteVideo(topic.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg
                        className="w-5 h-5"
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
                  </div>
                </div>

                {/* Upload lecture document */}
                <div className="flex items-center justify-between py-3 w-[50%]">
                  <label className="text-sm text-gray-700">
                    Upload lecture document
                  </label>
                  <button
                    onClick={() => handleDocumentUpload(topic.id)}
                    className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span>Upload</span>
                  </button>
                </div>

                {/* Upload lecture test */}
                <div className="flex items-center justify-between py-3 w-[50%]">
                  <label className="text-sm text-gray-700">
                    Upload lecture test
                  </label>
                  <button
                    onClick={() => handleTestUpload(topic.id)}
                    className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span>Upload</span>
                  </button>
                </div>

                {/* Create quiz */}
                <div className="flex items-center justify-between py-3 w-[50%]">
                  <label className="text-sm text-gray-700">Create quiz</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCreateQuiz(topic.id)}
                      className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
                    >
                      <span className="text-lg leading-none">+</span>
                      <span>Create Quiz</span>
                    </button>
                    <button
                      onClick={() => handleAssignQuiz(topic.id)}
                      className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Assign Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddTopic}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium mb-6"
          >
            <span className="text-lg">+</span>
            <span>Add Another Topic</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateCourse}
            className="px-6 py-2.5 bg-purple-700 text-white rounded-lg hover:bg-purple-800 font-medium text-sm"
          >
            Create Course
          </button>
        </div>
      </div>

      {/* 🟣 Create Quiz Drawer */}
      <CreateQuizDrawer
        open={quizDrawerOpen}
        onClose={() => setQuizDrawerOpen(false)}
        onCreate={handleCreateQuizSubmit}
      />
    </div>
  );
};

export default ViewCourse;
