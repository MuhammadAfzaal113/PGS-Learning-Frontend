import React, { useState } from "react";
import {
    Container,
    Grid,
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Paper,
    Divider,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const CreateQuiz = () => {
    const [quizTitle, setQuizTitle] = useState("");
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "",
            opt: 1,
            options: ["", "", "", ""],
            correctAnswer: "",
        },
    ]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: questions.length + 1,
                question: "",
                opt: 1,
                options: ["", "", "", ""],
                correctAnswer: "",
            },
        ]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );
    };

    const updateOption = (questionId, optionIndex, value) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = value;
                    return { ...q, options: newOptions };
                }
                return q;
            })
        );
    };

    const [showModal, setShowModal] = useState(false);
    const [lastCreatedQuiz, setLastCreatedQuiz] = useState(null);

    const handleCreateQuiz = () => {
        const payload = { title: quizTitle, questions };
        console.log("Quiz Created:", payload);
        setLastCreatedQuiz(payload);
        setShowModal(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="600" gutterBottom>
                    Create Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>
                    Please provide all of the information below to create your quiz.
                </Typography>

                {/* Quiz Title */}
                <Box mb={4}>
                    <Typography variant="subtitle1" fontWeight={500} mb={1}>
                        Quiz Title
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter quiz title"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        size="small"
                    />
                </Box>

                {/* Questions Section */}
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Questions
                </Typography>

                {questions.map((question, qIndex) => (
                    <Paper
                        key={question.id}
                        variant="outlined"
                        sx={{ p: 3, mb: 3, borderRadius: 2 }}
                    >
                        {/* <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            > */}
                        <Typography fontWeight={600} color="#664286">Question {qIndex + 1}</Typography>
                        {/* </Box> */}

                        <Grid container spacing={3}>
                            {/* Left Side - Question & Options */}
                            <Grid item xs={12} md={6} sx={{ width: "408px", maxWidth: "408px" }}>
                                <div className="flex justify-between">
                                    <Box mb={2} sx={{ width: "304px" }}>
                                        <Typography variant="subtitle2" mb={1}>
                                            Question
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder="Enter your question"
                                            value={question.question}
                                            onChange={(e) =>
                                                updateQuestion(question.id, "question", e.target.value)
                                            }
                                            size="small"
                                        />
                                    </Box>

                                    <Box mb={2} sx={{ width: "88px" }}>
                                        <Typography variant="subtitle2" mb={1}>
                                            Opt's
                                        </Typography>
                                        <Select
                                            value={question.opt}
                                            onChange={(e) =>
                                                updateQuestion(
                                                    question.id,
                                                    "opt",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            fullWidth
                                            size="small"
                                            sx={{ backgroundColor: "#F5F5F5", borderRadius: 1 }}
                                        >
                                            {[1, 2, 3, 4].map((num) => (
                                                <MenuItem key={num} value={num}>
                                                    {num}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </div>

                                {/* Options */}
                                {question.options.map((opt, i) => (
                                    <Box mb={2} key={i}>
                                        <Typography variant="subtitle2" mb={1}>
                                            Option {i + 1}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            placeholder={`Enter option ${i + 1}`}
                                            value={opt}
                                            onChange={(e) =>
                                                updateOption(question.id, i, e.target.value)
                                            }
                                            size="small"
                                        />
                                    </Box>
                                ))}

                                {questions.length > 1 && (
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => removeQuestion(question.id)}
                                        sx={{
                                            gap: "8px",
                                            color: "#D32F2F",
                                            "&:hover": {
                                                backgroundColor: "transparent", // removes red hover
                                            },
                                        }}
                                    >
                                        <DeleteForeverOutlinedIcon fontSize="small" />
                                        <Typography fontWeight="500" sx={{ fontWeight: "600px", fontSize: "14px", lineHeight: "100%" }}>
                                            Add Another Question
                                        </Typography>
                                    </IconButton>
                                )}
                            </Grid>

                            {/* Vertical Divider */}
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    mx: 2,
                                    borderColor: "#E0E0E0", // light gray line
                                    borderRightWidth: 1,
                                }}
                            />

                            {/* Right Side - Correct Answer */}
                            <Grid item xs={12} md={6} sx={{ width: "408px", maxWidth: "408px" }}>
                                <Box
                                    sx={{
                                        backgroundColor: "#C8E6C9",
                                        borderRadius: 2,
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="subtitle2" mb={1}>
                                        Correct Answer
                                    </Typography>
                                    <Select
                                        fullWidth
                                        displayEmpty
                                        value={question.correctAnswer || ""}
                                        onChange={(e) =>
                                            updateQuestion(question.id, "correctAnswer", e.target.value)
                                        }
                                        size="small"
                                        sx={{
                                            backgroundColor: "#fff",
                                            borderRadius: 1,
                                        }}
                                    >
                                        <MenuItem value="" disabled>
                                            Select option
                                        </MenuItem>
                                        <MenuItem value="option1">Option 1</MenuItem>
                                        <MenuItem value="option2">Option 2</MenuItem>
                                        <MenuItem value="option3">Option 3</MenuItem>
                                        <MenuItem value="option4">Option 4</MenuItem>
                                    </Select>

                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}

                {/* Footer Buttons */}
                <Box display="flex" justifyContent="space-between" gap={3} >

                    {/* Add Another Question */}
                    <Box
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                        onClick={addQuestion}
                    >
                        <AddOutlinedIcon />
                        <Typography fontWeight="500" sx={{ fontWeight: "600px", fontSize: "14px", lineHeight: "100%" }}>
                            Add Another Question
                        </Typography>
                    </Box>

                    <div className="flex gap-2">
                        <button
                            className="px-4 py-2 rounded-lg border border-[#EEEEEE] text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>


                        <button onClick={handleCreateQuiz} className="px-4 py-2 bg-[#664286] text-white rounded-lg hover:bg-[#7A4B9D]">Create Quiz</button>
                    </div>

                </Box>
            </Paper>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 border border-blue-400 relative">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Quiz Created</h2>
                        <p className="text-sm text-gray-700 mb-4">
                            Your quiz has been successfully created successfully. You can manage your quiz's section.
                        </p>

                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    if (lastCreatedQuiz) {
                                        navigate('/teacher/quizes/detail', { state: { quiz: lastCreatedQuiz } });
                                    }
                                }}
                                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Close
                            </button>
                        </div>

                        {/* Optional close "X" button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default CreateQuiz;
