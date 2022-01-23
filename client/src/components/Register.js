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
            autoCompplete="off"
            className="authForm2 paper"
        >
            <div className="surveyInputs">
                <TextField
                    name="name"
                    fullWidth
                    label="Vardas"
                    className="surveyInput"
                    value={newUser.name}
                    onChange={(e) => handleChange(e, newUser, setNewUser)}
                />
                <TextField
                    name="surname"
                    fullWidth
                    className="surveyInput"
                    label="Pavarde"
                    value={newUser.surname}
                    onChange={(e) => handleChange(e, newUser, setNewUser)}
                />
                <TextField
                    name="email"
                    fullWidth
                    className="surveyInput"
                    label="El. pastas"
                    value={newUser.email}
                    onChange={(e) => handleChange(e, newUser, setNewUser)}
                />
                <TextField
                    name="password"
                    fullWidth
                    className="surveyInput"
                    type="password"
                    label="Slaptazodis"
                    value={newUser.password}
                    onChange={(e) => handleChange(e, newUser, setNewUser)}
                />

                <InputLabel id="demo-simple-select-label">Issirinkite role:</InputLabel>
                <TextField
                    select
                    name="role"
                    value={newUser.role}
                    label="Role"
                    fullWidth
                    className="surveyInput"
                    onChange={(e) => handleChange(e, newUser, setNewUser)}
                >
                    <MenuItem value="Role" disabled>Role</MenuItem>
                    <MenuItem value="1">Vadovas</MenuItem>
                    <MenuItem value="2">Darbuotojas</MenuItem>
                </TextField>

                {
                    newUser.role === "1" ?
                        <TextField
                            name="companyName"
                            fullWidth
                            className="surveyInput"
                            label="Imones pavadinimas"
                            value={newUser.company.name}
                            onChange={(e) => handleChange(e, newUser, setNewUser)}
                        />
                        : null
                }
            </div>

            <div className="authButtons">
                <Button
                    variant="contained"
                    className="darkPurpleContainedBtn"
                    onClick={() => register()}
                >
                    Registruotis
                </Button>
                <div className="textLink">
                    <div>Jau turite paskyra? </div>
                    <a
                        href="#"
                        className="darkPurpleBtn"
                        onClick={() => setLoginMode(true)}
                    >
                        Prisijunkite cia
                    </a>
                </div>
            </div>
        </Box>
    );
};

export default RegisterComponent;