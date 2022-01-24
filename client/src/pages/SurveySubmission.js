import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import SurveySubmissionWizardComponent from "../components/SurveySubmissionWizard";
import {MessageContext} from "../context/MessageContext";

const SurveySubmissionPage = () => {
    const [survey, setSurvey] = useState({});
    const [activeSection, setActiveSection] = useState(0);

    const {surveyId} = useParams();

    const messageContext = useContext(MessageContext);

    const getSurvey = () => {
        axios.get("http://localhost:8030/api/surveys/" + surveyId, {}).then((response) => {
            const surveyData = response.data.data;

            surveyData.sections.map((section, sIndex) => {
                section.questions.map((question, qIndex) => {
                    if (["SINGLE_CHOICE", "BOOLEAN"].includes(question.question_type)) {
                        surveyData.sections[sIndex].questions[qIndex].selected_answer = "";
                    } else {
                        surveyData.sections[sIndex].questions[qIndex].selected_answers = [];
                    }
                });
            });

            setSurvey(surveyData);
        });
    };

    const submitSurvey = () => {
        const data = {
            answer_ids: []
        };

        survey.sections.map(section => {
            section.questions.map(question => {
                if (["SINGLE_CHOICE", "BOOLEAN"].includes(question.question_type)) {
                    data.answer_ids.push(question.selected_answer);
                } else {
                    data.answer_ids.push(...question.selected_answers);
                }
            });
        });

        axios.post(
            `http://localhost:8030/api/surveys/submit/${survey.id}`,
            JSON.stringify(data),
            {
                headers: {'Content-Type': 'application/json'}
            }
        ).then(response => {
            messageContext.setMessage("Išsaugota sėkmingai")
        });
    };

    useEffect(() => {
        getSurvey();
    }, []);

    return (
        <div className="submitPage">
            <div className="surveyInfo">
                <h1>Apklausa {survey.name}</h1>
                <pre>{survey.description}</pre>
            </div>

            {survey.sections ?
                <SurveySubmissionWizardComponent
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    survey={survey}
                    setSurvey={setSurvey}
                    submitSurvey={submitSurvey}
                />
                :
                null
            }
        </div>
    );
};

export default SurveySubmissionPage;