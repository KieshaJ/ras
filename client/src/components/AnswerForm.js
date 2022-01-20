import React from "react";
import {Button, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

const AnswerFormComponent = (props) => {
    const {question} = props;

    return (
        <div>
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
};

export default AnswerFormComponent;