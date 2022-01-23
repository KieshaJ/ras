import React, {useEffect, useState} from "react";
import HeaderComponent from "./components/Header";
import AlertComponent from "./components/Alert";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AuthPage from "./pages/Auth";
import AdminDashboardPage from "./pages/AdminDashboard";
import SurveySubmissionPage from "./pages/SurveySubmission";
import ReviewsPage from "./pages/Reviews";

import {UserContext} from "./context/UserContext";
import {CompanyContext} from "./context/CompanyContext";
import {MessageContext} from "./context/MessageContext";

const getUserLS = () => {
    return {
        token: localStorage.getItem("ras-user-token"),
        role: localStorage.getItem("ras-user-role"),
        name: localStorage.getItem("ras-user-name"),
        surname: localStorage.getItem("ras-user-surname"),
        email: localStorage.getItem("ras-user-email")
    };
};

const getUserAPI = () => {
};

const getCompanyLS = () => {
    return {
        name: localStorage.getItem("ras-company-name"),
        ownerId: localStorage.getItem("ras-company-ownerId"),
        workerIds: JSON.parse(localStorage.getItem("ras-company-workerIds"))
    };
};

function App() {
    const [user, setUser] = useState({});
    const [company, setCompany] = useState({});
    const [message, setMessage] = useState("Bybs");

    const initUser = () => {
        const userData = getUserLS();
        // if(!userData.token && !["/", "/auth"].includes(window.location.pathname)) {
        //     window.location.pathname = "/auth";
        // }
        // else {
        setUser(userData);
        // }
    };

    const initCompany = () => {
        const companyData = getCompanyLS();
        setCompany(companyData);
    };

    useEffect(() => {
        initUser();
        initCompany();
    }, []);

    return (
        <div className="App">
            <UserContext.Provider value={{user, setUser}}>
                <CompanyContext.Provider value={{company, setCompany}}>
                    <MessageContext.Provider value={{message, setMessage}}>
                        <HeaderComponent/>
                        <AlertComponent/>

                        <BrowserRouter>
                            <Routes>
                                <Route path="/">
                                    <Route path="/" element={<HomePage/>}/>
                                    <Route path="survey/:surveyId" element={<SurveySubmissionPage/>}/>
                                    <Route path="dashboard" element={<DashboardPage/>}/>
                                    <Route path="auth" element={<AuthPage/>}/>
                                    <Route path="admin" element={<AdminDashboardPage/>}/>
                                    <Route path="reviews" element={<ReviewsPage/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </MessageContext.Provider>
                </CompanyContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
