import React, {useState} from "react";
import {Box, Button, Modal} from "@mui/material";
import {Link} from "react-router-dom";

const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="home">
            <div className="homeContent">
                <h1 className="darkPurpleBtn">RESTORANŲ APKLAUSŲ SISTEMA</h1>

                <div className="homeButtons">
                    <Button
                        variant="outlined"
                        className="darkPurpleBtn fullWidth"
                        size="large"
                        onClick={() => setModalOpen(true)}
                    >
                        PILDYTI APKLAUSĄ
                    </Button>
                    <Link
                        to="reviews"
                        className="link"
                    >
                        <Button
                            variant="outlined"
                            className="darkPurpleBtn fullWidth"
                            size="large"
                        >
                            PALIKTI ATSILIEPIMĄ APIE RESTORANĄ
                        </Button>
                    </Link>
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Box className="paper">dicks</Box>
            </Modal>
        </div>
    );
};

export default HomePage;