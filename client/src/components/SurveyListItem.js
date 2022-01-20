import React from "react";
import {Badge, Button, ButtonGroup, Card, CardContent, Typography} from "@mui/material";
import {Bolt, Delete, Edit} from "@mui/icons-material";

const SurveyListItemComponent = (props) => {
    const {
        index,
        survey,
        editMode
    } = props;

    return (
        <Card variant="outlined" key={index} className="surveyListItem paper">
            <CardContent>
                <Typography sx={{fontSize: 24}}>
                    {survey.name}
                </Typography>
            </CardContent>
            <CardContent
            >
                <Badge className="inactiveBadge">
                    active
                </Badge>
            </CardContent>
            <CardContent
                className="surveyListItemActions"
            >
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined secondary button group"
                >
                    <Button
                        onClick={() => {
                        }}
                        className="darkPurpleBtn"
                    >
                        <Bolt/>
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