import React from "react";
import {TextField} from "@mui/material";

const AnswerFormComponent = (props) => {
    const {
        answer,
        sIndex,
        qIndex,
        aIndex,
        survey,
        setSurvey
    } = props;

    const handleChange = (e) => {
        const surveyCopy = survey;
        const sectionCopy = surveyCopy.sections[sIndex];
        const questionCopy = sectionCopy.questions[qIndex];
        const answerCopy = questionCopy.answers[aIndex];

        answerCopy[e.target.name] = e.target.value;
        surveyCopy.sections[sIndex].questions[qIndex].answers[aIndex] = answerCopy;
        setSurvey({
            ...surveyCopy
        });
    };

    return (
        <div
            className="ml-2"
        >
            <div
                key={`answer-${aIndex}`}
                className="ml-1"
            >
                <TextField
                    name="title"
                    fullWidth
                    label="Antraštė"
                    className="surveyInput"
                    value={answer.title}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </div>
    );
};

export default AnswerFormComponent;