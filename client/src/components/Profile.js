import React, {useContext, useEffect, useState} from "react";
import {
    Avatar, Button, Typography
} from "@mui/material";
import {UserContext} from "../context/UserContext";

const ProfileComponent = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const userContext = useContext(UserContext);
    const userData = userContext.user;

    const init = () => {
        if(userData && userData.token) {
            setLoggedIn(true);
        }
    };

    useEffect(() => {
        init();
    }, [userData])

    return (
        <div>
            {!loggedIn ?
                <div className="header-profile">
                    <Button variant="contained" color="success" onClick={() => setLoggedIn(true)}>PRISIJUNGTI</Button>
                    <Button variant="outlined" color="success">REGISTRUOTIS</Button>
                </div>
                :
                <div className="header-profile">
                    <Avatar>{`${userData.name[0]}${userData.surname[0]}`}</Avatar>
                    <Typography component="b">{`${userData.name} ${userData.surname}`}</Typography>
                </div>
            }
        </div>
    );
};

export default ProfileComponent;