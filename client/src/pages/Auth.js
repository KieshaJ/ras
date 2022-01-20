import React, {useState} from "react";
import axios from "axios";
import LoginComponent from "../components/Login";
import RegisterComponent from "../components/Register";

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
        role: 2,
        companyName: undefined
    });
    const [renderCompanyField, setRenderCompanyField] = useState(newUser.role === 1);

    const handleChange = (e, state, setState) => {
        const stateCopy = state;
        stateCopy[e.target.name] = e.target.value;
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
                <LoginComponent
                    credentials={credentials}
                    setCredentials={setCredentials}
                    handleChange={handleChange}
                    login={login}
                    setLoginMode={setLoginMode}
                />
                :
                <RegisterComponent
                    newUser={newUser}
                    setNewUser={setNewUser}
                    handleChange={handleChange}
                    setLoginMode={setLoginMode}
                    renderCompanyField={renderCompanyField}
                    setRenderCompanyField={setRenderCompanyField}
                />
            }
        </div>
    );
};

export default AuthPage;