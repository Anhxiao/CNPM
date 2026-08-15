import axios from "axios";

const api = axios.create({

    baseURL:

        import.meta.env.VITE_API_URL ||

        "http://localhost:5000/api",

    timeout: 15000,

    headers: {

        "Content-Type": "application/json"

    }

});

/**
 * Request Interceptor
 */

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem(

            "accessToken"

        );

        if (token) {

            config.headers.Authorization =

                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

/**
 * Response Interceptor
 */

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (

            error.response &&

            error.response.status === 401

        ) {

            console.warn(

                "Token hết hạn hoặc không hợp lệ."

            );

            localStorage.clear();

            window.location.replace("/login");

        }

        return Promise.reject(error);

    }

);

export default api;