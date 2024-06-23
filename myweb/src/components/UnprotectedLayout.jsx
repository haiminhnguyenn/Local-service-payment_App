import { Navigate, Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const UnprotectedLayout = () => {
    const { user } = useAuth();

    if (user) {
        if(user.mode === "user"){
            return <Navigate to="/" />;
        }
        else if(user.mode === "admin"){
            return <Navigate to="/admin/" />;
        }
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};