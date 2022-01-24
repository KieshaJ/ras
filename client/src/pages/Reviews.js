import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Grid, Modal, Rating, TextField} from "@mui/material";
import axios from "axios";
import {MessageContext} from "../context/MessageContext";

const ReviewsPage = () => {
    const [search, setSearch] = useState("");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [newReview, setNewReview] = useState({
        company_id: "",
        content: "",
        rating: 0
    });
    const [reviews, setReviews] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const messageContext = useContext(MessageContext);

    const getCompanyList = () => {
        axios.get("http://localhost:8020/api/companies", {}).then((response) => {
            setCompanies(response.data.data);
        });
    };

    const getReviewList = (companyId) => {
        axios.get("http://localhost:8040/api/reviews/list/" + companyId).then((response) => {
            setReviews(response.data.data);
        });
    };

    const postReview = () => {
        const reviewData = newReview;
        reviewData.company_id = selectedCompany.id;
        axios.post("http://localhost:8040/api/reviews", reviewData).then(response => {
            setReviews([response.data.data, ...reviews]);
            setNewReview({
                company_id: "",
                content: "",
                rating: 0
            });
            localStorage.setItem("ras-message", "Issaugota sekmingai");
            messageContext.setMessage("Išsaugota sėkmingai");
        });
    };

    const initReviewModal = (company) => {
        setSelectedCompany(company);
        getReviewList(company.id);
        setModalOpen(true);
    };

    useEffect(() => {
        getCompanyList();
    }, []);

    return (
        <div className="home">
            <div className="homeContent">
                <h2 className="authHeading">ATSILIEPIMAI</h2>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div
                    className="paper reviewModal"
                >
                    <h2>{`Restoranas "${selectedCompany.name}"`}</h2>
                    <hr/>

                    <div className="reviewForm paper">
                        <h3>Palikite savo atsiliepima</h3>
                        <Rating
                            name="rating"
                            size="large"
                            value={newReview.rating}
                            onChange={(e, value) => {
                                setNewReview({
                                    ...newReview,
                                    [e.target.name]: value
                                });
                            }}
                        />
                        <TextField
                            name="content"
                            className="surveyInput"
                            fullWidth
                            multiline
                            maxRows={4}
                            rows={4}
                            label="Komentaras"
                            value={newReview.content}
                            onChange={e => {
                                setNewReview({
                                    ...newReview,
                                    [e.target.name]: e.target.value
                                });
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            className="darkPurpleContainedBtn"
                            onClick={() => postReview()}
                        >
                            Palikti atsiliepimą
                        </Button>
                    </div>
                    <div>
                        <h3>Atsiliepimų sąrašas</h3>

                        {reviews.map((review => (
                            <div key={review.id} className="reviewItem paper">
                                <Rating
                                    readOnly
                                    size="large"
                                    value={review.rating}
                                />
                                <p>{review.content}</p>
                            </div>
                        )))}
                    </div>
                </div>
            </Modal>

            <div className="surveyWizard overflow paper">
                <h3>Restoranai</h3>
                <a href="/" className="textLink link">Atgal</a>

                <TextField
                    fullWidth
                    name="search"
                    className="surveyInput"
                    label="Paieška"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Box className="companyGrid">
                    <Grid
                        container
                        direction="row"
                        spacing={0}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {companies.map(company => {
                            return (company.name.toUpperCase().includes(search.toUpperCase()) ?
                                    <Grid
                                        item
                                        xs={3}
                                        key={company.id}
                                        className="paper companyItem"
                                        onClick={() => initReviewModal(company)}
                                    >
                                        <h3>{`Restoranas "${company.name}"`}</h3>
                                    </Grid>
                                    :
                                    null
                            );
                        })}
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default ReviewsPage;