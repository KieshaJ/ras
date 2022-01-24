import React, {useContext} from "react";
import {Container, Typography} from "@mui/material";
import ProfileComponent from "./Profile";
import {CompanyContext} from "../context/CompanyContext";

const HeaderComponent = () => {
    const companyContext = useContext(CompanyContext);


    return(
        <Container disableGutters={true} maxWidth="100%" className="header">
            <Typography onClick={() => window.location.pathname = "/"} sx={{fontSize: 32}} color="text.secondary">RAS</Typography>
            <div className="companyStr"> {companyContext.company.name}</div>
            <ProfileComponent />
        </Container>
    );
};

export default HeaderComponent;