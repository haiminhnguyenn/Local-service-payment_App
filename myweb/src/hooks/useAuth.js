import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthenContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useLocalStorage("user", { token: null, UserId: null, mode: null, timestamp: null });
    const navigate = useNavigate();

    const login = async (data) => {
        const timestamp = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day session
        setUserData({ token: data.token, UserId: data.UserId, mode: data.mode, timestamp });
        navigate("/");
    };

    const logout = () => {
        setUserData({ token: null, UserId: null, mode: null, timestamp: null });
        navigate("/login", { replace: true });
    };

    const isSessionValid = useMemo(() => {
        if (!userData || !userData.timestamp) {
            return false;
        }
        const currentTime = new Date().getTime();
        return currentTime < userData.timestamp;
    }, [userData]);

    const value = useMemo(
        () => ({
            user: isSessionValid ? userData : null,
            login,
            logout,
            isSessionValid,
        }),
        [isSessionValid, login, logout, userData]
    );

    return <AuthenContext.Provider value={value}>{children}</AuthenContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthenContext);
};
