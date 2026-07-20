import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));

        }

        setLoading(false);

    }, []);

    const login = (userData) => {

        localStorage.setItem(

            "user",

            JSON.stringify(userData)

        );

        setUser(userData);

    };

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                logout,

                isAuthenticated: !!user

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuthContext = () => {

    return useContext(AuthContext);

};

export default AuthContext;