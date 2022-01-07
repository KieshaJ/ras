import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Grid, MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {Add, ArrowDownward, ArrowDownwardSharp, Bolt, Delete, Edit, KeyboardArrowDown} from "@mui/icons-material";


const SurveyPageComponent = () => {
    const [surveys, setSurveys] = useState([]);
    const [survey, setSurvey] = useState({});
    const [mode, setMode] = useState(0);
    const [activeSection, setActiveSection] = useState(-1);

    const questionTypes = [
        {
            label: "SINGLE_CHOICE",
            value: "SINGLE_CHOICE"
        },
        {
            label: "MULTI_CHOICE",
            value: "MULTI_CHOICE"
        },
        {
            label: "BOOLEAN",
            value: "BOOLEAN"
        }
    ];

    const getSurveyList = () => {
        axios.get("http://localhost:8020/api/surveys", {}).then((response) => {
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
                        {console.log(survey)}
                        <div className="surveyInputs">
                            <TextField
                                id="name"
                                fullWidth
                                label="Pavadinimas"
                                className="surveyInput"
                                value={survey.name}
                                // onChange={(e) => handleChange(e, credentials, setCredentials)}
                            />
                            <TextField
                                id="description"
                                fullWidth
                                multiline
                                label="Aprašymas"
                                className="surveyInput"
                                value={survey.description}
                                // onChange={(e) => handleChange(e, credentials, setCredentials)}
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
                                                        <div
                                                            key={`question-${qIndex}`}
                                                            className="ml-1"
                                                        >
                                                            <Typography
                                                                component="span"
                                                                sx={{fontSize: 16}}
                                                            >
                                                                {question.title}
                                                            </Typography>

                                                            <TextField
                                                                id="name"
                                                                fullWidth
                                                                label="Pavadinimas"
                                                                className="surveyInput"
                                                                value={question.title}
                                                                // onChange={(e) => handleChange(e, credentials, setCredentials)}
                                                            />
                                                            <TextField
                                                                id="description"
                                                                fullWidth
                                                                multiline
                                                                label="Aprašymas"
                                                                className="surveyInput"
                                                                value={question.description}
                                                                // onChange={(e) => handleChange(e, credentials, setCredentials)}
                                                            />

                                                            <TextField
                                                                id="question_type"
                                                                fullWidth
                                                                variant="outlined"
                                                                select label="Klausimo tipas"
                                                                helperText="Pasirinkite klausimo tipą"
                                                                className="surveyInput"
                                                                value={question.question_type}
                                                                // onChange={(e) => handleChange(e, newUser, setNewUser)}
                                                            >
                                                                {questionTypes.map((questionType) => (
                                                                    <MenuItem key={`qt-${questionType.value}`}
                                                                              value={questionType.value}>
                                                                        {questionType.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>

                                                            {question.question_type !== "BOOLEAN" ?
                                                                <div>
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{fontSize: 16}}
                                                                    >
                                                                        Atsakymai
                                                                    </Typography>
                                                                    <br/>
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="purpleBtn"
                                                                    >
                                                                        <Add/>Pridėti atsakymą
                                                                    </Button>
                                                                    <hr/>

                                                                    {
                                                                        question.answers.map((answer, aIndex) => {
                                                                            return (
                                                                                <div
                                                                                    key={`answer-${aIndex}`}
                                                                                    className="ml-1"
                                                                                >
                                                                                    <TextField
                                                                                        id="title"
                                                                                        fullWidth
                                                                                        label="Antraštė"
                                                                                        className="surveyInput"
                                                                                        value={answer.title}
                                                                                        // onChange={(e) => handleChange(e, credentials, setCredentials)}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        })
                                                                    }
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    );
                                                })}

                                            </div>
                                        </CardContent>
                                        :
                                        null
                                    }
                                </Card>
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