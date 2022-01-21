import React, {useState} from "react";
import axios from "axios";
import LoginComponent from "../components/Login";
import RegisterComponent from "../components/Register";

const AuthPage = () => {
    const [loginMode, setLoginMode] = useState(false);
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
    // const [company, setCompany] = useState({
    //     name: ""
    // });

    const handleChange = (e, state, setState) => {
        if(e.target.name === "companyName") {
            const newUserCopy = newUser;
            newUserCopy.company.name = e.target.value;
            setState({
                ...newUserCopy
            });
        }
        else {
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
            localStorage.setItem("ras-user-email", data.user.email);
            localStorage.setItem("ras-user-name", data.user.name);
            localStorage.setItem("ras-user-surname", data.user.surname);
            localStorage.setItem("ras-user-role", data.user.role);
        });
    };

    const register = () => {
        axios.post("http://localhost:8010/api/users/register", JSON.stringify(newUser)).then((response) => {
            console.log(response);
        });
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
                    register={register}
                    handleChange={handleChange}
                    setLoginMode={setLoginMode}
                />
            }
        </div>
    );
};

export default AuthPage;