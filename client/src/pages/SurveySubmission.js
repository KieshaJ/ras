import React, {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const SurveySubmissionPage = () => {
    const {surveyId} = useParams();

    const {survey, setSurvey} = useState({});

    const getSurvey = (id) => {
        axios.get("http://localhost:8030/api/surveys/" + surveyId, {}).then((response) => {
            setSurvey(response.data.data);
        });
    };

    return (
        <div className="home">
            <h1>Survey submission page</h1>
            {surveyId}
        </div>
    );
};

export default SurveySubmissionPage;