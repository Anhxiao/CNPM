import api from "./api";

const userService = {

    getProfile() {

        return api.get("/users/profile");

    },

    updateProfile(data) {

        return api.put("/users/profile", data);

    },

    updateAvatar(formData) {

        return api.put(

            "/users/avatar",

            formData,

            {

                headers: {

                    "Content-Type":

                    "multipart/form-data"

                }

            }

        );

    },

    changePassword(data) {

        return api.put(

            "/users/change-password",

            data

        );

    },

    getUsers() {

        return api.get("/users");

    }

};

export default userService;