import React from "react";
import {Badge, Button, Card, CardContent, Typography} from "@mui/material";
import axios from "axios";
import {Download} from "@mui/icons-material";

const ReportListItemComponent = (props) => {
    const {
        index,
        survey,
    } = props;

    // const downloadPdf = (surveyId) => {
    //     axios.get("http://localhost:8030/api/surveys/download/" + surveyId, {
    //         responseType: 'blob',
    //         headers: {
    //             Accept: 'application/octet-stream',
    //         }
    //     }).then(response => {
    //         const blob = new Blob([response.data], {type: "application/pdf"})
    //         const link = document.createElement('a')
    //         link.href = window.URL.createObjectURL(blob)
    //         link.download = 'report_' + surveyId + '.pdf';
    //         link.click()
    //     });
    // };

    return (
        <Card variant="outlined" key={index} className="surveyListItem paper">
            <CardContent>
                <Typography sx={{fontSize: 24}}>
                    {survey.name}
                </Typography>
            </CardContent>
            <CardContent
                className="surveyListItemActions"
            >
                <Button
                    variant="outlined"
                    className="darkPurpleBtn"
                    // onClick={() => downloadPdf(survey.id)}
                >
                    <Download/>
                </Button>
            </CardContent>
        </Card>
    );
};

export default ReportListItemComponent;