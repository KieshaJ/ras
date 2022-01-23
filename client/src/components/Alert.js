import React, {useContext, useEffect} from "react";
import {Alert} from "@mui/material";
import {MessageContext} from "../context/MessageContext";

const AlertComponent = () => {
    const messageContext = useContext(MessageContext);
    const message = messageContext.message;

    useEffect(() => {
        setTimeout(() => {
            messageContext.setMessage("");
        }, 5000);
    });

    return (message !== "" ?
            <Alert
                className="alert"
            >
                {message}
            </Alert>
            :
            null
    );
};

export default AlertComponent