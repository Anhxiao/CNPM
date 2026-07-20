import api from "./api";

const notificationService = {

    getNotifications() {

        return api.get("/notifications");

    },

    markAsRead(id) {

        return api.patch(

            `/notifications/${id}/read`

        );

    },

    deleteNotification(id) {

        return api.delete(

            `/notifications/${id}`

        );

    }

};

export default notificationService;