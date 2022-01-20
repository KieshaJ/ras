import React from "react";
import {MenuItem, TextField, Typography} from "@mui/material";
import AnswerForm from "./AnswerForm";

const QuestionFormComponent = (props) => {
    const {
        question,
        qIndex
    } = props;

    const questionTypes = [
        {
            label: "SINGLE_CHOICE",
            value: "SINGLE_CHOICE"
        },
        {
            label: "MULTI_CHOICE",
            value: "MULTI_CHOICE"
        },
        {
            label: "BOOLEAN",
            value: "BOOLEAN"
        }
    ];

    return (
        <div
            key={`question-${qIndex}`}
            className="ml-1"
        >
            <Typography
                component="span"
                sx={{fontSize: 16}}
            >
                {question.title}
            </Typography>

            <TextField
                id="name"
                fullWidth
                label="Pavadinimas"
                className="surveyInput"
                value={question.title}
                // onChange={(e) => handleChange(e, credentials, setCredentials)}
            />
            <TextField
                id="description"
                fullWidth
                multiline
                label="Aprašymas"
                className="surveyInput"
                value={question.description}
                // onChange={(e) => handleChange(e, credentials, setCredentials)}
            />

            <TextField
                id="question_type"
                fullWidth
                variant="outlined"
                select label="Klausimo tipas"
                helperText="Pasirinkite klausimo tipą"
                className="surveyInput"
                value={question.question_type}
                // onChange={(e) => handleChange(e, newUser, setNewUser)}
            >
                {questionTypes.map((questionType) => (
                    <MenuItem key={`qt-${questionType.value}`}
                              value={questionType.value}>
                        {questionType.label}
                    </MenuItem>
                ))}
            </TextField>

            <AnswerForm question={question}/>
        </div>
    );
};

export default QuestionFormComponent;