export const getProgress = (

    completed,

    total

) => {

    if (total === 0) {

        return 0;

    }

    return Math.round(

        (completed / total) * 100

    );

};

export const getPriorityColor = (priority) => {

    switch (priority) {

        case "HIGH":

            return "#dc3545";

        case "MEDIUM":

            return "#ffc107";

        case "LOW":

            return "#198754";

        default:

            return "#6c757d";

    }

};

export const truncate = (

    text,

    length = 50

) => {

    if (!text) {

        return "";

    }

    if (text.length <= length) {

        return text;

    }

    return text.substring(

        0,

        length

    ) + "...";

};

export const generateAvatar = (name) => {

    if (!name) {

        return "?";

    }

    return name

        .split(" ")

        .map(word => word[0])

        .join("")

        .substring(0, 2)

        .toUpperCase();

};