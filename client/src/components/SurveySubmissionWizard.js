import React from "react";
import {ArrowBackIosNew, ArrowForwardIos} from "@mui/icons-material";
import {Button, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup} from "@mui/material";

const SurveySubmissionWizardComponent = (props) => {
    const {
        activeSection,
        setActiveSection,
        survey,
        setSurvey,
        submitSurvey
    } = props;

    const handleSingleChoice = (e, sIndex, qIndex) => {
        const copy = survey;

        copy.sections[sIndex].questions[qIndex].selected_answer = e.target.value;
        setSurvey({
            ...copy
        });
    };

    const handleMultiChoice = (e, sIndex, qIndex, value) => {
        const copy = survey;

        if (e.target.checked) {
            copy.sections[sIndex].questions[qIndex].selected_answers.push(value);
        } else {
            const index = copy.sections[sIndex].questions[qIndex].selected_answers.indexOf(value);
            copy.sections[sIndex].questions[qIndex].selected_answers.splice(index, 1);
        }

        setSurvey({
            ...copy
        });
    };

    const nextSection = () => {
        changeSection(1);
    };

    const changeSection = (delta) => {
        if (activeSection + delta < 0) return;
        if (activeSection + delta > survey.sections.length - 1) return;

        setActiveSection(activeSection + delta);
    };

    return (
        <div className="surveyWizard paper">
            <div className="leftArrow darkPurpleBtn" onClick={() => changeSection(-1)}>
                <ArrowBackIosNew/>
            </div>
            <div className="rightArrow darkPurpleBtn" onClick={() => changeSection(1)}>
                <ArrowForwardIos/>
            </div>
            {activeSection + 1 === survey.sections.length ?
                <Button
                    className="wizardButton darkPurpleBtn"
                    variant="outlined"
                    onClick={() => submitSurvey()}
                >
                    PATEIKTI
                </Button>
                :
                <Button
                    className="wizardButton darkPurpleBtn"
                    variant="outlined"
                    onClick={() => nextSection()}
                >
                    TOLIAU
                </Button>
            }

            <div>
                <h2>{`${activeSection + 1}/${survey.sections.length}`} {survey.sections[activeSection].name}</h2>
                <pre>{survey.sections[activeSection].description}</pre>

                {survey.sections[activeSection].questions.map((question, qIndex) => {
                    return (
                        <div key={qIndex} className="ml-1 mt-1">
                            <h3>{`${qIndex + 1}. ${question.title}`}</h3>

                            {["SINGLE_CHOICE", "BOOLEAN"].includes(question.question_type) ?
                                <RadioGroup
                                    className="ml-2"
                                    value={
                                        survey.sections[activeSection].questions[qIndex].selected_answer
                                    }
                                    onChange={(e) => handleSingleChoice(e, activeSection, qIndex)}
                                >
                                    {question.answers.map((answer, aIndex) => {
                                        return (
                                            <FormControlLabel
                                                key={aIndex}
                                                value={answer.id}
                                                control={<Radio/>}
                                                label={answer.title}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                                :
                                <FormGroup className="ml-2">
                                    {question.answers.map((answer, aIndex) => {
                                        return (
                                            <FormControlLabel
                                                key={aIndex}
                                                value={answer.id}
                                                control={
                                                    <Checkbox
                                                        name={answer.title}
                                                        checked={question.selected_answers.includes(answer.id)}
                                                        onChange={(e) => handleMultiChoice(e, activeSection, qIndex, answer.id)}
                                                    />
                                                }
                                                label={answer.title}
                                            />
                                        );
                                    })}
                                </FormGroup>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SurveySubmissionWizardComponent;