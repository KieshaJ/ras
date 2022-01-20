import React from "react";
import {Button, ButtonGroup, Card, CardContent, TextField, Typography} from "@mui/material";
import {Add, Delete, KeyboardArrowDown} from "@mui/icons-material";
import QuestionFormComponent from "./QuestionForm";

const SectionComponent = (props) => {
    const {
        survey,
        section,
        sIndex,
        activeSection,
        setActiveSection
    } = props;

    return (
        <Card
            key={`section-${sIndex}`}
            component="div"
            className="sectionContainer paper"
        >
            <CardContent
                className="sectionContent"
            >
                <Typography
                    component="span"
                    sx={{fontSize: 16}}
                >
                    {`${sIndex + 1}/${survey.sections.length} ${section.name}`}
                </Typography>

                <div className="toggleExpand">
                    <ButtonGroup
                        variant="outlined"
                        className="sectionBtns"
                    >
                        <Button
                            className="purpleBtn"
                        >
                            <Add/>
                        </Button>
                        <Button
                            className="blackBtn"
                        >
                            <Delete/>
                        </Button>
                    </ButtonGroup>
                    <Button
                        className={`darkPurpleBtn ${activeSection === sIndex ? "activeArrow" : ""}`}
                        onClick={() => setActiveSection(activeSection !== sIndex ? sIndex : -1)}
                    >
                        <KeyboardArrowDown/>
                    </Button>
                </div>
            </CardContent>

            {activeSection === sIndex ?
                <CardContent>
                    <div className="surveyInputs">
                        <TextField
                            id="name"
                            fullWidth
                            label="Pavadinimas"
                            className="surveyInput"
                            value={section.name}
                            // onChange={(e) => handleChange(e, credentials, setCredentials)}
                        />
                        <TextField
                            id="description"
                            fullWidth
                            multiline
                            label="Aprašymas"
                            className="surveyInput"
                            value={section.description}
                            // onChange={(e) => handleChange(e, credentials, setCredentials)}
                        />

                        <Typography
                            component="span"
                            sx={{fontSize: 16}}
                        >
                            Klausimai
                        </Typography>
                        <br/>
                        <Button
                            variant="outlined"
                            className="purpleBtn"
                        >
                            <Add/>Pridėti klausimą
                        </Button>
                        <hr/>
                        {section.questions.map((question, qIndex) => {
                            return (
                                <QuestionFormComponent
                                    key={qIndex}
                                    question={question}
                                    qIndex={qIndex}
                                />
                            );
                        })}
                    </div>
                </CardContent>
                :
                null
            }
        </Card>
    );
};

export default SectionComponent;