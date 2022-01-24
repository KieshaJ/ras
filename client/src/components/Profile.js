import React, {useContext, useEffect, useState} from "react";
import {
    Avatar, Button, Menu, MenuItem, Typography
} from "@mui/material";
import {UserContext} from "../context/UserContext";

const ProfileComponent = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const userContext = useContext(UserContext);
    const userData = userContext.user;

    const init = () => {
        if (userData && userData.token) {
            setLoggedIn(true);
        }
    };

    const logout = () => {
        localStorage.removeItem("ras-user-token");
        localStorage.removeItem("ras-user-id");
        localStorage.removeItem("ras-user-email");
        localStorage.removeItem("ras-user-name");
        localStorage.removeItem("ras-user-surname");
        localStorage.removeItem("ras-user-role");

        localStorage.removeItem("ras-company-id");
        localStorage.removeItem("ras-company-name");

        window.location.pathname = "/";
    };

    useEffect(() => {
        init();
    }, [userData])

    return (
        <div>
            {!loggedIn ?
                <div className="header-profile">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            window.location.pathname = "auth"
                        }}
                    >
                        PRISIJUNGTI
                    </Button>
                </div>
                :
                <div className="header-profile">
                    <Avatar
                        onClick={(e) => setAnchor(e.currentTarget)}
                    >
                        {`${userData.name[0]}${userData.surname[0]}`}
                    </Avatar>
                    <Menu
                        anchorEl={anchor}
                        open={open}
                        onClose={() => setAnchor(null)}
                    >
                        <MenuItem
                            onClick={() => setAnchor(null)}
                        >
                            Profilis
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchor(null);
                                window.location.pathname = "dashboard"
                            }}
                        >
                            Valdymo skydas
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchor(null);
                                logout();
                            }}
                        >
                            Atsijungti
                        </MenuItem>
                    </Menu>
                    <Typography component="b">{`${userData.name} ${userData.surname}`}</Typography>
                </div>
            }
        </div>
    );
};

export default ProfileComponent;