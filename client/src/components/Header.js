import React from "react";
import {Container, Typography} from "@mui/material";
import ProfileComponent from "./Profile";

const HeaderComponent = () => {
    return(
        <Container disableGutters={true} maxWidth="100%" className="header">
            <Typography sx={{fontSize: 32}} color="text.secondary">RAS</Typography>
            <ProfileComponent />
        </Container>
    );
};

export default HeaderComponent;