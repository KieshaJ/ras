import React from "react";
import {Box, Button, TextField} from "@mui/material";

const LoginComponent = (props) => {
    const {
        credentials,
        setCredentials,
        handleChange,
        login,
        setLoginMode
    } = props;

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="authForm paper"
        >
            <TextField
                name="email"
                fullWidth
                className="surveyInput"
                label="El. paštas"
                value={credentials.email}
                onChange={(e) => handleChange(e, credentials, setCredentials)}
            />
            <TextField
                name="password"
                fullWidth
                className="surveyInput"
                type="password"
                label="Slaptažodis"
                value={credentials.password}
                onChange={(e) => handleChange(e, credentials, setCredentials)}
            />

            <div className="authButtons">
                <Button
                    variant="contained"
                    className="darkPurpleContainedBtn"
                    onClick={login}
                >
                    Prisijungti
                </Button>
                <div className="textLink">
                    <div>Neturite paskyros? </div>
                    <a
                        href="#"
                        className="darkPurpleBtn"
                        onClick={() => setLoginMode(false)}
                    >
                        Registruokitės čia
                    </a>
                </div>
            </div>
        </Box>
    );
};

export default LoginComponent;