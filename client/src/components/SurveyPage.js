import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {Add} from "@mui/icons-material";
import SectionComponent from "./SectionForm";
import SurveyListItemComponent from "./SurveyListItem";


const SurveyPageComponent = () => {
    const [surveys, setSurveys] = useState([]);
    const [survey, setSurvey] = useState({});
    const [mode, setMode] = useState(0);
    const [activeSection, setActiveSection] = useState(-1);

    const getSurveyList = () => {
        axios.get("http://localhost:8030/api/surveys", {}).then((response) => {
            setSurveys(response.data.data);
        });
    };

    const editMode = (selected) => {
        setSurvey(selected);
        setMode(2);
    };

    const handleChange = (e) => {
        const surveyCopy = survey;
        surveyCopy[e.target.name] = e.target.value;
        setSurvey({
            ...surveyCopy
        });
    };

    useEffect(() => {
        getSurveyList();
    }, []);

    return (
        <Grid container spacing={2} className="surveyPage">
            <Grid item xs={4} className="pageHeader"/>
            <Grid item xs={8} className="pageHeader">
                <Typography component="h1">
                    Apklausos
                </Typography>
            </Grid>
            <Grid item xs={4} className="surveyList">
                <Box>
                    {surveys.map((survey, index) => {
                        return (
                            <SurveyListItemComponent
                                key={index}
                                index={index}
                                survey={survey}
                                editMode={editMode}
                            />
                        );
                    })}
                </Box>
            </Grid>
            {/*<Grid item xs={2} className="surveyElementTree">*/}
            {/*    <Box>*/}
            {/*        Survey element tree*/}
            {/*    </Box>*/}
            {/*</Grid>*/}
            <Grid item xs={8} className="surveyPanel">
                {mode === 0 ?
                    <Box
                        component="div"
                        className="surveyEditor"
                    >
                        Sukurkite naują arba redaguokite esančią apklausą
                    </Box>
                    :
                    null
                }
                {/*{mode === 1 ?*/}
                {/*    <Box></Box>*/}
                {/*    :*/}
                {/*    null*/}
                {/*}*/}
                {mode === 2 ?
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
                    </Box>
                    :
                    null
                }
            </Grid>
        </Grid>
    );
};

export default SurveyPageComponent;