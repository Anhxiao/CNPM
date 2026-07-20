import {

    TOKEN_KEY,

    REFRESH_TOKEN_KEY,

    USER_KEY

} from "./constants";

export const getToken = () => {

    return localStorage.getItem(

        TOKEN_KEY

    );

};

export const setToken = (token) => {

    localStorage.setItem(

        TOKEN_KEY,

        token

    );

};

export const removeToken = () => {

    localStorage.removeItem(

        TOKEN_KEY

    );

};

export const getRefreshToken = () => {

    return localStorage.getItem(

        REFRESH_TOKEN_KEY

    );

};

export const setRefreshToken = (token) => {

    localStorage.setItem(

        REFRESH_TOKEN_KEY,

        token

    );

};

export const removeRefreshToken = () => {

    localStorage.removeItem(

        REFRESH_TOKEN_KEY

    );

};

export const getUser = () => {

    const user = localStorage.getItem(

        USER_KEY

    );

    return user

        ? JSON.parse(user)

        : null;

};

export const setUser = (user) => {

    localStorage.setItem(

        USER_KEY,

        JSON.stringify(user)

    );

};

export const removeUser = () => {

    localStorage.removeItem(

        USER_KEY

    );

};

export const clearStorage = () => {

    removeToken();

    removeRefreshToken();

    removeUser();

};  