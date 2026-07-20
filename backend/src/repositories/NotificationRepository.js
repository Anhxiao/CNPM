import Notification from "../models/Notification.js";

class NotificationRepository {

    async create(data) {

        return await Notification.create(data);

    }

    async findByUser(userId) {

        return await Notification.find({

            user: userId

        })

        .sort({

            createdAt: -1

        });

    }

    async findById(id) {

        return await Notification.findById(id);

    }

    async markAsRead(id) {

        return await Notification.findByIdAndUpdate(

            id,

            {

                isRead: true

            },

            {

                new: true

            }

        );

    }

    async delete(id) {

        return await Notification.findByIdAndDelete(id);

    }

}

export default new NotificationRepository();