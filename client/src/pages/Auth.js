import React, {useContext, useState} from "react";
import axios from "axios";
import LoginComponent from "../components/Login";
import RegisterComponent from "../components/Register";
import {MessageContext} from "../context/MessageContext";
import {CompanyContext} from "../context/CompanyContext";

const AuthPage = () => {
    const [loginMode, setLoginMode] = useState(true);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "",
        company: {
            name: ""
        }
    });

    const messageContext = useContext(MessageContext);

    const handleChange = (e, state, setState) => {
        if (e.target.name === "companyName") {
            const newUserCopy = newUser;
            newUserCopy.company.name = e.target.value;
            setState({
                ...newUserCopy
            });
        } else {
            setState({
                    ...state,
                    [e.target.name]: e.target.value
                }
            );
        }
    };


    const login = () => {
        axios.post("http://localhost:8010/api/users/login", credentials).then((response) => {
            const data = response.data.data;
            localStorage.setItem("ras-user-token", data.token);
            localStorage.setItem("ras-user-id", data.user.id);
            localStorage.setItem("ras-user-email", data.user.email);
            localStorage.setItem("ras-user-name", data.user.name);
            localStorage.setItem("ras-user-surname", data.user.surname);
            localStorage.setItem("ras-user-role", data.user.role);

            localStorage.setItem("ras-message", "Prisijungta sėkmingai");
            messageContext.setMessage("Prisijungta sėkmingai")
            getCompany(data.user.id);
        });
    };

    const getCompany = (userId) => {
        axios.get("http://localhost:8020/api/companies/user/" + userId).then((response) => {
            const data = response.data.data;
            localStorage.setItem("ras-company-id", data.id);
            localStorage.setItem("ras-company-name", data.name);

            window.location.pathname = "dashboard";
        });
    };

    const register = () => {
        const userData = newUser;
        userData.role = parseInt(userData.role);

        axios.post(
            "http://localhost:8010/api/users/register",
            JSON.stringify(userData),
            {
                headers: {'Content-Type': 'application/json'}
            }
        ).then(() => {
            setLoginMode(true);
            localStorage.setItem("ras-message", "Registracija sėkminga");
            messageContext.setMessage("Registracija sėkminga");
        });
    };


    return (
        <div className="authContainer">
            <h1 className="authHeading">
                {loginMode ?
                    "Prisijungimas"
                    :
                    "Registracija"
                }
            </h1>
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
                    register={register}
                    handleChange={handleChange}
                    setLoginMode={setLoginMode}
                />
            }
        </div>
    );
};

export default AuthPage;