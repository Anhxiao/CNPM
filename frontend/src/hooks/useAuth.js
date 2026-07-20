import { useState } from "react";

import authService from "../services/auth.service";

const useAuth = () => {

    const [loading, setLoading] = useState(false);

    const login = async (data) => {

        setLoading(true);

        try {

            const response = await authService.login(data);

            const result = response.data.data;

            localStorage.setItem(
                "accessToken",
                result.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                result.refreshToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            return result;

        } finally {

            setLoading(false);

        }

    };

    const register = async (data) => {

        setLoading(true);

        try {

            return await authService.register(data);

        } finally {

            setLoading(false);

        }

    };

    const logout = async () => {

        const refreshToken = localStorage.getItem(
            "refreshToken"
        );

        if (refreshToken) {

            await authService.logout(refreshToken);

        }

        localStorage.clear();

    };

    return {

        loading,

        login,

        register,

        logout

    };

};

export default useAuth;