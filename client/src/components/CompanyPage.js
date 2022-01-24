import React from "react";
import {Button, Grid, Typography} from "@mui/material";

const CompanyPageComponent = (props) => {
    const {
        setSelectedPage
    } = props;

    return (
        <Grid container spacing={2} className="surveyPage">
            <Grid item xs={4} className="pageHeader">
                <Button onClick={() => setSelectedPage("survey")}>Apklausos</Button>
                <Button onClick={() => setSelectedPage("report")}>Ataskaitos</Button>
            </Grid>
            <Grid item xs={8} className="pageHeader">
                <Typography component="h1">
                    Restoranas
                </Typography>
            </Grid>
        </Grid>
    );
};

export default CompanyPageComponent;