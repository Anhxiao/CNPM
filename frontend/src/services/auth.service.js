import api from "./api";

const authService = {

    register(data) {

        return api.post("/auth/register", data);

    },

    login(data) {

        return api.post("/auth/login", data);

    },

    logout(refreshToken) {

        return api.post("/auth/logout", {

            refreshToken

        });

    },

    refreshToken(refreshToken) {

        return api.post("/auth/refresh-token", {

            refreshToken

        });

    },

    getProfile() {

        return api.get("/auth/profile");

    }

};

export default authService;