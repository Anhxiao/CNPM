import NotificationRepository from "../repositories/NotificationRepository.js";

class NotificationService {

    async createNotification(data) {

        return await NotificationRepository.create(data);

    }

    async getNotifications(userId) {

        return await NotificationRepository.findByUser(userId);

    }

    async readNotification(id) {

        return await NotificationRepository.markAsRead(id);

    }

    async deleteNotification(id) {

        return await NotificationRepository.delete(id);

    }

}

export default new NotificationService();