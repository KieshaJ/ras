import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import axios from "axios";
import SurveyListItemComponent from "./SurveyListItem";
import ReportListItem from "./ReportListItem";
import ReportListItemComponent from "./ReportListItem";

const ReportPageComponent = (props) => {
    const [surveys, setSurveys] = useState([]);

    const {
        setSelectedPage
    } = props;

    const getSurveyList = () => {
        axios.get("http://localhost:8030/api/surveys", {}).then((response) => {
            setSurveys(response.data.data);
        });
    };

    useEffect(() => {
        getSurveyList();
    }, []);

    return (
        <Grid container spacing={2} className="surveyPage">
            <Grid item xs={4} className="pageHeader">
                <Button onClick={() => setSelectedPage("survey")}>Apklausos</Button>
                <Button onClick={() => setSelectedPage("company")}>Restoranas</Button>
            </Grid>
            <Grid item xs={8} className="pageHeader">
                <Typography component="h1">
                    Ataskaitos
                </Typography>
            </Grid>
            <Grid item xs={4} className="surveyList">
                <Box>
                    {surveys.map((survey, index) => {
                        return (
                            <ReportListItemComponent
                                key={index}
                                index={index}
                                survey={survey}
                            />
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default ReportPageComponent;