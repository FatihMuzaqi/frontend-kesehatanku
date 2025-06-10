import { Navigate } from "react-router";

export default function SetupRoleUser({ children }) {
    const role = localStorage.getItem('role');
    const RouteRole = role.toLowerCase() === "user";

    return RouteRole ? children : <Navigate to={"/dashboard"}/>;
}