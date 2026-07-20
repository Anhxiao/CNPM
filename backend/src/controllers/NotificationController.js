import NotificationService from "../services/NotificationService.js";

import {

    successResponse,

    errorResponse

} from "../utils/response.js";

class NotificationController {

    async getNotifications(req, res) {

        try {

            const notifications = await NotificationService.getNotifications(

                req.user.id

            );

            return successResponse(

                res,

                "Lấy thông báo thành công.",

                notifications

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                500

            );

        }

    }

    async markAsRead(req, res) {

        try {

            const notification = await NotificationService.readNotification(

                req.params.id

            );

            return successResponse(

                res,

                "Đã đọc thông báo.",

                notification

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    async deleteNotification(req, res) {

        try {

            await NotificationService.deleteNotification(

                req.params.id

            );

            return successResponse(

                res,

                "Đã xóa thông báo."

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

}

export default new NotificationController();