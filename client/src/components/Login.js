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
                variant="outlined"
                label="Email"
                value={credentials.email}
                onChange={(e) => handleChange(e, credentials, setCredentials)}
            />
            <TextField
                name="password"
                variant="outlined"
                type="password"
                label="Password"
                value={credentials.password}
                onChange={(e) => handleChange(e, credentials, setCredentials)}
            />
            <Button variant="contained" onClick={login}>Login</Button>
            <span>Do not have an account? <a href="#" onClick={() => setLoginMode(false)}>Register here</a></span>
        </Box>
    );
};

export default LoginComponent;