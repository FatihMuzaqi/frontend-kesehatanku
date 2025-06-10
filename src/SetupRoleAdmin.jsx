import { Navigate } from "react-router";

export default function SetupRoleAdmin({ children }) {
    const role = localStorage.getItem('role');
    const RouteRole = role.toLowerCase() === "admin";

    return RouteRole ? children : <Navigate to={"/"} />;
}