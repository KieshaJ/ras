import React, {useEffect, useState} from "react";
import {Box, Grid, Modal, TextField} from "@mui/material";
import axios from "axios";

const ReviewsPage = () => {
    const [search, setSearch] = useState("");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [newReview, setNewReview] = useState({});
    const [reviews, setReviews] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const getCompanyList = () => {
        axios.get("http://localhost:8020/api/companies", {}).then((response) => {
            setCompanies(response.data.data);
        });
    };

    const getReviewList = (companyId) => {
        axios.get("http://localhost:8040/api/reviews/list/" + companyId).then((response)=> {
            setReviews(response.data.data);
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

                    <div>Mano atsiliepimas</div>
                    <div>Atsiliepimu sarasas</div>
                </div>
            </Modal>

            <div className="surveyWizard overflow paper">
                <h3>Restoranai</h3>
                <TextField
                    fullWidth
                    name="search"
                    className="surveyInput"
                    label="Paieska"
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