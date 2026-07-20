export const isEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

};

export const isPhone = (phone) => {

    return /^[0-9]{10,11}$/

        .test(phone);

};

export const minLength = (

    value,

    length

) => {

    return value.length >= length;

};

export const required = (value) => {

    return value !== null &&

        value !== undefined &&

        value !== "";

};