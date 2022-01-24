import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {
    Box, Button, ButtonGroup,
    Grid, Modal, Rating, TextField,
    Typography
} from "@mui/material";
import SurveyListItemComponent from "./SurveyListItem";
import SurveyFormComponent from "./SurveyForm";
import {CompanyContext} from "../context/CompanyContext";
import {MessageContext} from "../context/MessageContext";


const SurveyPageComponent = (props) => {
    const [surveys, setSurveys] = useState([]);
    const [survey, setSurvey] = useState({});
    const [mode, setMode] = useState(0);
    const [activeSection, setActiveSection] = useState(-1);
    const [companyModal, setCompanyModal] = useState(false);
    const [reviewModal, setReviewModal] = useState(false);
    const [reviews, setReviews] = useState([]);

    const companyContext = useContext(CompanyContext);
    const messageContext = useContext(MessageContext);

    const getSurveyList = () => {
        axios.get("http://localhost:8030/api/surveys", {}).then((response) => {
            setSurveys(response.data.data);
            // getReviewList();
        });
    };

    const getReviewList = () => {
        axios.get("http://localhost:8040/api/reviews/list/" + companyContext.company.id).then((response) => {
            setReviews(response.data.data);
        });
    };

    const createMode = () => {
        setSurvey({
            name: "",
            company_id: companyContext.company.id,
            description: "",
            sections: []
        });
        setMode(1);
    };

    const editMode = (selected) => {
        setSurvey(selected);
        setMode(2);
    };

    const create = () => {
        axios.post("http://localhost:8030/api/surveys", survey).then(response => {
            setSurveys([...surveys, response.data.data]);
            setMode(0);
            localStorage.setItem("ras-message", "Išsaugota sėkmingai");
            messageContext.setMessage("Išsaugota sėkmingai")
        });
    };

    const update = () => {
        setMode(0);
    };

    useEffect(() => {
        getSurveyList();
        console.log(reviews);
    }, []);

    return (
        <Grid container spacing={2} className="surveyPage">
            <Modal
                open={reviewModal}
                onClose={() => setReviewModal(false)}
            >
                <div
                    className="paper reviewModal"
                >
                    <h2>{`Restoranas "${companyContext.company.name}"`}</h2>
                    <hr/>

                    <div>
                        <h3>Atsiliepimų sąrašas</h3>

                        {reviews.map((review => (
                            <div key={review.id} className="reviewItem paper">
                                <Rating
                                    readOnly
                                    size="large"
                                    value={review.rating}
                                />
                                <p>{review.content}</p>
                            </div>
                        )))}
                    </div>
                </div>
            </Modal>

            <Grid item xs={4} className="pageHeader dashPadding">
                <ButtonGroup variant="outlined" className="dashBtns">
                    <Button
                        className="darkPurpleBtn"
                        // onClick={() => setSelectedPage("company")}
                    >
                        Restoranas
                    </Button>
                    <Button
                        className="darkPurpleBtn"
                        onClick={() => {
                            setReviewModal(true);
                            getReviewList();
                        }}
                    >
                        Atsiliepimai
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={8} className="pageHeader">
                {/*<Typography component="h1">*/}
                {/*    Apklausos*/}
                {/*</Typography>*/}
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
                        <Button
                            variant="contained"
                            fullWidth
                            className="darkPurpleContainedBtn createBtn"
                            onClick={() => createMode()}
                        >
                            Kurti
                        </Button>
                    </Box>
                    :
                    null
                }
                {mode === 1 ?
                    <SurveyFormComponent
                        survey={survey}
                        setSurvey={setSurvey}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        submit={create}
                    />
                    :
                    null
                }
                {mode === 2 ?
                    <SurveyFormComponent
                        survey={survey}
                        setSurvey={setSurvey}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        submit={update}
                    />
                    :
                    null
                }
            </Grid>
        </Grid>
    );
};

export default SurveyPageComponent;