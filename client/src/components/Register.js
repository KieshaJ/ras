import React from "react";
import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

const RegisterComponent = (props) => {
    const {
        newUser,
        setNewUser,
        register,
        handleChange,
        setLoginMode,
    } = props;

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            className="authForm paper"
        >
            <TextField
                name="name"
                variant="outlined"
                label="Name"
                value={newUser.name}
                onChange={(e) => handleChange(e, newUser, setNewUser)}
            />
            <TextField
                name="surname"
                variant="outlined"
                label="Surname"
                value={newUser.surname}
                onChange={(e) => handleChange(e, newUser, setNewUser)}
            />
            <TextField
                name="email"
                variant="outlined"
                label="Email"
                value={newUser.email}
                onChange={(e) => handleChange(e, newUser, setNewUser)}
            />
            <TextField
                name="password"
                variant="outlined"
                type="password"
                label="Password"
                value={newUser.password}
                onChange={(e) => handleChange(e, newUser, setNewUser)}
            />

            <InputLabel id="demo-simple-select-label">Choose your role:</InputLabel>
            <Select
                name="role"
                value={newUser.role}
                label="Role"
                onChange={(e) => handleChange(e, newUser, setNewUser)}
            >
                <MenuItem value="Role" disabled>Role</MenuItem>
                <MenuItem value="1">Owner</MenuItem>
                <MenuItem value="2">Worker</MenuItem>
            </Select>

            {
                newUser.role === "1" ?
                    <TextField
                        name="companyName"
                        variant="outlined"
                        label="Company name"
                        value={newUser.company.name}
                        onChange={(e) => handleChange(e, newUser, setNewUser)}
                    />
                    : null
            }

            <Button variant="contained" onClick={() => register()}>Register</Button>
            <span>Already registered? <a href="#" onClick={() => setLoginMode(true)}>Login here</a></span>
        </Box>
    );
};

export default RegisterComponent;