import React from "react";
import {Box, Button, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import SectionComponent from "./SectionForm";

const SurveyFormComponent = (props) => {
    const {
        survey,
        setSurvey,
        activeSection,
        setActiveSection,
        submit
    } = props;

    const handleChange = (e) => {
        const surveyCopy = survey;
        surveyCopy[e.target.name] = e.target.value;
        setSurvey({
            ...surveyCopy
        });
    };

    const addSection = () => {
        const surveyCopy = survey;
        surveyCopy.sections.push({
            name: "",
            description: "",
            questions: []
        });
        setSurvey({
            ...surveyCopy
        });
    };

    return (
        <Box
            component="div"
            className="surveyEditor"
        >
            <div className="surveyInputs">
                <TextField
                    name="name"
                    fullWidth
                    label="Pavadinimas"
                    className="surveyInput"
                    value={survey.name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    name="description"
                    fullWidth
                    multiline
                    label="Aprašymas"
                    className="surveyInput"
                    value={survey.description}
                    onChange={(e) => handleChange(e)}
                />

                <Button
                    variant="outlined"
                    className="darkPurpleBtn"
                    onClick={() => addSection()}
                >
                    <Add/>Pridėti skyrių
                </Button>
            </div>
            {survey.sections.map((section, sIndex) => {
                return (
                    <SectionComponent
                        key={`s-${sIndex}`}
                        survey={survey}
                        setSurvey={setSurvey}
                        section={section}
                        sIndex={sIndex}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                );
            })}
            <div className="surveyInputs">
                <Button
                    variant="outlined"
                    fullWidth
                    className="darkPurpleContainedBtn createBtn"
                    onClick={() => submit()}
                >
                    Saugoti
                </Button>
            </div>
        </Box>
    );
};

export default SurveyFormComponent;