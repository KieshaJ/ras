import React from "react";
import {
    Box,
    Button,
    Checkbox,
    FormGroup,
    FormLabel,
    TextField
} from "@mui/material";

const RegisterComponent = (props) => {
    const {
        newUser,
        setNewUser,
        handleChange,
        setLoginMode,
        renderCompanyField,
        setRenderCompanyField
    } = props;

    // const roles = [
    //     {
    //         label: "Owner",
    //         value: 1
    //     },
    //     {
    //         label: "Worker",
    //         value: 2
    //     }
    // ];

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
            <FormGroup>
                <FormLabel
                    label="Label"
                />
                <Checkbox
                    checked={renderCompanyField}
                    onChange={() => setRenderCompanyField(!renderCompanyField)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </FormGroup>
            {renderCompanyField ?
                <TextField
                    name="companyName"
                    variant="outlined"
                    label="Company name"
                    value={newUser.companyName}
                    onChange={(e) => handleChange(e, newUser, setNewUser)}
                />
                :
                null
            }
            <Button variant="contained" onClick={() => console.log(newUser)}>Register</Button>
            <span>Already registered? <a href="#" onClick={() => setLoginMode(true)}>Login here</a></span>
        </Box>
    );
};

export default RegisterComponent;