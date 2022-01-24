import React from "react";
import {Button, MenuItem, TextField, Typography} from "@mui/material";
import AnswerForm from "./AnswerForm";
import {Add} from "@mui/icons-material";

const QuestionFormComponent = (props) => {
    const {
        question,
        sIndex,
        qIndex,
        survey,
        setSurvey
    } = props;

    const questionTypes = [
        {
            label: "Vienas pasirinkimas",
            value: "SINGLE_CHOICE"
        },
        {
            label: "Keli pasirinkimai",
            value: "MULTI_CHOICE"
        },
        {
            label: "Loginis",
            value: "BOOLEAN"
        }
    ];

    const handleChange = (e) => {
        const surveyCopy = survey;
        const sectionCopy = surveyCopy.sections[sIndex];
        const questionCopy = sectionCopy.questions[qIndex];

        questionCopy[e.target.name] = e.target.value;
        surveyCopy.sections[sIndex].questions[qIndex] = questionCopy;
        setSurvey({
            ...surveyCopy
        });
    };

    const addAnswer = (sIndex, qIndex) => {
        const surveyCopy = survey;
        const sectionCopy = surveyCopy.sections[sIndex];
        const questionCopy = sectionCopy.questions[qIndex];

        questionCopy.answers.push({
            title: ""
        });
        surveyCopy.sections[sIndex].questions[qIndex] = questionCopy;
        setSurvey({
            ...surveyCopy
        });
    };

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
                name="title"
                fullWidth
                label="Antraštė"
                className="surveyInput"
                value={question.title}
                onChange={(e) => handleChange(e)}
            />
            <TextField
                name="description"
                fullWidth
                // multiline
                label="Aprašymas"
                className="surveyInput"
                value={question.description}
                onChange={(e) => handleChange(e)}
            />

            <TextField
                name="question_type"
                fullWidth
                variant="outlined"
                select label="Klausimo tipas"
                helperText="Pasirinkite klausimo tipą"
                className="surveyInput"
                value={question.question_type}
                onChange={(e) => handleChange(e)}
            >
                {questionTypes.map((questionType) => (
                    <MenuItem key={`qt-${questionType.value}`}
                              value={questionType.value}>
                        {questionType.label}
                    </MenuItem>
                ))}
            </TextField>

            <Typography
                component="span"
                sx={{fontSize: 16}}
            >
                Atsakymai
            </Typography>
            <br/>
            <Button
                variant="outlined"
                className="purpleBtn"
                onClick={() => addAnswer(sIndex, qIndex)}
            >
                <Add/>Pridėti atsakymą
            </Button>
            <hr/>
            {question.answers.map((answer, aIndex) => {
                return (
                    <AnswerForm
                        key={`a-${aIndex}`}
                        answer={answer}
                        sIndex={sIndex}
                        qIndex={qIndex}
                        aIndex={aIndex}
                        survey={survey}
                        setSurvey={setSurvey}
                    />
                );
            })}
        </div>
    );
};

export default QuestionFormComponent;