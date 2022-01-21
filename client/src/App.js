import React, {useEffect, useState} from "react";
import HeaderComponent from "./components/Header";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AuthPage from "./pages/Auth";
import AdminDashboardPage from "./pages/AdminDashboard";

import {UserContext} from "./context/UserContext";
import SurveySubmissionPage from "./pages/SurveySubmission";

const getUserLC = () => {
    return {
        token: localStorage.getItem("ras-user-token"),
        role: localStorage.getItem("ras-user-role"),
        name: localStorage.getItem("ras-user-name"),
        surname: localStorage.getItem("ras-user-surname"),
        email: localStorage.getItem("ras-user-email")
    };
};

const getUserAPI = () => {};

function App() {
    const [user, setUser] = useState({});

    const initUser = () => {
        const userData = getUserLC();
        // if(!userData.token && !["/", "/auth"].includes(window.location.pathname)) {
        //     window.location.pathname = "/auth";
        // }
        // else {
            setUser(userData);
        // }
    };

    useEffect(() => {
        initUser();
    }, []);

    return (
        <div className="App">
            <UserContext.Provider value={{user, setUser}}>
                <HeaderComponent/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="survey/:surveyId" element={<SurveySubmissionPage/>}/>
                            <Route path="dashboard" element={<DashboardPage/>}/>
                            <Route path="auth" element={<AuthPage/>}/>
                            <Route path="admin" element={<AdminDashboardPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    );
}

export default App;
