import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Box,
    Grid,
    Typography
} from "@mui/material";
import SurveyListItemComponent from "./SurveyListItem";
import SurveyFormComponent from "./SurveyForm";


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

    useEffect(() => {
        getSurveyList();
    }, []);

    return (
        <Grid container spacing={2} className="surveyPage">
            <Grid item xs={4} className="pageHeader">
                <a>Restoranas</a>
                <a>Ataskaitos</a>
            </Grid>
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
                    <SurveyFormComponent
                        survey={survey}
                        setSurvey={setSurvey}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                    :
                    null
                }
            </Grid>
        </Grid>
    );
};

export default SurveyPageComponent;