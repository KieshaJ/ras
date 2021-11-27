import React from "react";
import HeaderComponent from "./components/Header";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AuthPage from "./pages/Auth";
import AdminDashboardPage from "./pages/AdminDashboard";

function App() {
    return (
        <div className="App">
            <HeaderComponent/>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="dashboard" element={<DashboardPage/>}/>
                        <Route path="auth" element={<AuthPage/>}/>
                        <Route path="admin" element={<AdminDashboardPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
