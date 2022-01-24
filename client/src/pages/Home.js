import React, {useState} from "react";
import {Box, Button, Modal, TextField} from "@mui/material";
import {Link} from "react-router-dom";

const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [link, setLink] = useState("");

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
                <Box className="homeModal paper">
                    <h3>Pildyti apklausą</h3>
                    <TextField
                        fullWidth
                        label="Nuoroda"
                        className="surveyInput"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        className="darkPurpleContainedBtn"
                        onClick={() => {
                            window.location = link;
                        }}
                    >
                        Pradėti
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default HomePage;