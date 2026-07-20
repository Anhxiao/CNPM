export const formatDate = (date) => {

    if (!date) {

        return "";

    }

    return new Date(date).toLocaleDateString(

        "vi-VN"

    );

};

export const formatDateTime = (date) => {

    if (!date) {

        return "";

    }

    return new Date(date).toLocaleString(

        "vi-VN"

    );

};

export const formatPercent = (value) => {

    return `${Number(value).toFixed(0)}%`;

};

export const capitalize = (text) => {

    if (!text) {

        return "";

    }

    return text.charAt(0).toUpperCase() +

        text.slice(1);

};