import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import Cookie from "./Model/accessCookie";
import LoadingSpinner from "./Animation Loading/loadingSpinner";

export default function PrivateRoute({ children }) {

    const [isSuccess, setSuccess] = useState(null);

    async function getCookie() {
        try {
            await Cookie.getCookie();
            setSuccess(true);
        } catch (err) {
            setSuccess(false);
        }
    }
    useEffect(() => {
        getCookie();
    })

    if (isSuccess === null) {
        return <LoadingSpinner Width={20} Height={2} />
    }

    return isSuccess ? children : <Navigate to="/login" />;
}