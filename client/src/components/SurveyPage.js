import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, ButtonGroup, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";


const SurveyPageComponent = () => {
    const [surveys, setSurveys] = useState([]);
    // const [survey, setSurvey] = useState({});

    const getSurveyList = () => {
        axios.get("http://localhost:8020/surveys", {}).then((response) => {
            setSurveys(response.data.data);
        });
    };

    useEffect(() => {
        getSurveyList();
    }, []);

    return (
        <Grid container spacing={2} className="surveyPage">
            <Grid item xs={2} className="surveyList">
                {surveys.map((survey, index) => {
                    return (
                        <Card variant="outlined" key={index} className="surveyListItem">
                            <CardContent>
                                <Typography sx={{fontSize: 24}} color="text.secondary">
                                    {survey.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup variant="outlined" color="success"
                                             aria-label="outlined secondary button group">
                                    <Button onClick={() => {
                                    }}>EDIT</Button>
                                    <Button color="error">DELETE</Button>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    );
                })}
            </Grid>
            <Grid item xs={9} className="surveyPanel">

            </Grid>
        </Grid>
    );
};

export default SurveyPageComponent;