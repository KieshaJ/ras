import React from "react";
import {Button} from "@mui/material";

const HomePage = () => {
    return (
        <div className="home">
            <div className="homeContent">
                <h1 className="darkPurpleBtn">RESTORANŲ APKLAUSŲ SISTEMA</h1>

                <div className="homeButtons">
                    <Button
                        variant="outlined"
                        className="darkPurpleBtn fullWidth"
                    >
                        PILDYTI APKLAUSĄ
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;