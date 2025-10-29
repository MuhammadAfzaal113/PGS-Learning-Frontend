import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Grid,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    Paper,
    Divider,
    IconButton,
    InputLabel,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RightDrawer from '../common/RightDrawer'

export default function CreateQuizDrawer({ open, onClose, onCreate }) {
    const [quizTitle, setQuizTitle] = useState('')
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "",
            opt: 1,
            options: ["", "", "", ""],
            correctAnswer: "",
        },
    ]);
    const [saving, setSaving] = useState(false)

    const handleQuizTitleChange = (e) => setQuizTitle(e.target.value)

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions]
        updated[index][field] = value
        setQuestions(updated)
    }

    const handleOptionChange = (qIndex, optIndex, value) => {
        const updated = [...questions]
        updated[qIndex].options[optIndex] = value
        setQuestions(updated)
    }

    const handleAddQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { question: '', options: ['', '', '', ''], correctAnswer: '' },
        ])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            await (onCreate
                ? onCreate({ quizTitle, questions })
                : Promise.resolve())
            setQuizTitle('')
            setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }])
            onClose()
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    return (
        <RightDrawer open={open} onClose={onClose} title="Create Quiz" width={450}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <Box>
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

                {questions.map((question, qIndex) => (
                    <Box
                        key={question.id}


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
                    </Box>
                ))}

                <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    onClick={handleAddQuestion}
                    className="text-sm text-gray-700 w-fit"
                >
                    Add Another Question
                </Button>

                <Box className="flex justify-end gap-2 mt-2">
                    <Button onClick={onClose} variant="outlined" disabled={saving}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={saving}>
                        {saving ? 'Creating...' : 'Create Quiz'}
                    </Button>
                </Box>
            </Box>
        </RightDrawer>
    )
}

CreateQuizDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
}
