import React, {useState} from "react";
import {Box, Button, MenuItem, TextField} from "@mui/material";
import axios from "axios";

const AuthPage = () => {
    const [loginMode, setLoginMode] = useState(false);
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    });
    const [newUser, setNewUser] = useState({
        name: undefined,
        surname: undefined,
        email: undefined,
        password: undefined,
        role: undefined,
        companyName: undefined,
    });

    const roles = [
        {
            label: "Owner",
            value: 1
        },
        {
            label: "Worker",
            value: 2
        }
    ];

    const handleChange = (e, state, setState) => {
        const stateCopy = state;
        stateCopy[e.target.id] = e.target.value;
        setState(stateCopy);
    };

    const login = () => {
        axios.post("http://localhost:8010/api/users/login", credentials).then((response) => {
            const data = response.data.data;
            localStorage.setItem("ras-user-token", data.token);
            localStorage.setItem("ras-user-email", data.user.email);
            localStorage.setItem("ras-user-name", data.user.name);
            localStorage.setItem("ras-user-surname", data.user.surname);
            localStorage.setItem("ras-user-role", data.user.role);
        });
    };

    const register = () => {
    };

    return (
        <div className="authContainer">
            {loginMode ?
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="authForm paper"
                >
                    <TextField
                        id="email"
                        variant="outlined"
                        label="Email"
                        value={credentials.email}
                        onChange={(e) => handleChange(e, credentials, setCredentials)}
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        type="password"
                        label="Password"
                        value={credentials.password}
                        onChange={(e) => handleChange(e, credentials, setCredentials)}
                    />
                    <Button variant="contained" onClick={login}>Login</Button>
                    <span>Do not have an account? <a href="#">Register here</a></span>
                </Box>
                :
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    className="authForm paper"
                >
                    <TextField
                        id="name"
                        variant="outlined"
                        label="Name"
                        value={newUser.name}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    />
                    <TextField
                        id="surname"
                        variant="outlined"
                        label="Surname"
                        value={newUser.surname}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    />
                    <TextField
                        id="email"
                        variant="outlined"
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        type="password"
                        label="Password"
                        value={newUser.password}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    />
                    <TextField
                        id="role"
                        variant="outlined"
                        select label="Role"
                        helperText="Select your role"
                        value={newUser.role}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    >
                        {roles.map((role) => (
                            <MenuItem key={`role-option-${role.value}`} value={role.value}>
                                {role.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="companyName"
                        variant="outlined"
                        label="Company name"
                        value={newUser.companyName}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    />
                    <Button variant="contained">Register</Button>
                    <span>Already registered? <a href="#">Login here</a></span>
                </Box>
            }
        </div>
    );
};

export default AuthPage;