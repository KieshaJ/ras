import React, {useContext, useEffect} from "react";
import {Alert} from "@mui/material";
import {MessageContext} from "../context/MessageContext";

const AlertComponent = () => {
    const messageContext = useContext(MessageContext);
    const message = messageContext.message;

    useEffect(() => {
        setTimeout(() => {
            messageContext.setMessage("");
            localStorage.removeItem("ras-message");
        }, 5000);
    });

    return (message !== "" ?
            <Alert
                className="alert paper"
            >
                {message}
            </Alert>
            :
            null
    );
};

export default AlertComponent