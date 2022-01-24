import React from "react";
import {Badge, Button, ButtonGroup, Card, CardContent, Typography} from "@mui/material";
import {Bolt, Delete, Download, Edit} from "@mui/icons-material";
import axios from "axios";

const SurveyListItemComponent = (props) => {
    const {
        index,
        survey,
        editMode
    } = props;

    const downloadPdf = (surveyId) => {
        axios.get("http://localhost:8030/api/surveys/download/" + surveyId, {
            responseType: 'blob',
            headers: {
                Accept: 'application/octet-stream',
            }
        }).then(response => {
            const blob = new Blob([response.data], {type: "application/pdf"})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'report_' + surveyId + '.pdf';
            link.click()
        });
    };

    return (
        <Card variant="outlined" key={index} className="surveyListItem paper">
            <CardContent className="surveyListItemTitle">
                <Typography sx={{fontSize: 24}}>
                    {survey.name}
                </Typography>
            </CardContent>
            {/*<CardContent*/}
            {/*>*/}
            {/*    <Badge className="inactiveBadge">*/}
            {/*        active*/}
            {/*    </Badge>*/}
            {/*</CardContent>*/}
            <CardContent
                className="surveyListItemActions"
            >
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined secondary button group"
                >
                    {/*<Button*/}
                    {/*    onClick={() => {*/}
                    {/*    }}*/}
                    {/*    className="darkPurpleBtn"*/}
                    {/*>*/}
                    {/*    <Bolt/>*/}
                    {/*</Button>*/}
                    <Button
                        variant="outlined"
                        className="darkPurpleBtn"
                        onClick={() => downloadPdf(survey.id)}
                    >
                        <Download/>
                    </Button>
                    <Button
                        onClick={() => editMode(survey)}
                        className="purpleBtn"
                    >
                        <Edit/>
                    </Button>
                    <Button
                        className="blackBtn"
                    >
                        <Delete/>
                    </Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
};

export default SurveyListItemComponent;