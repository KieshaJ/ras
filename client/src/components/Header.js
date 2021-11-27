import React from "react";
import {Container, Typography} from "@mui/material";

const HeaderComponent = () => {
    return(
        <Container disableGutters={true} maxWidth="100%" className="header">
            <Typography sx={{fontSize: 32}} color="text.secondary">RAS</Typography>
        </Container>
    );
};

export default HeaderComponent;