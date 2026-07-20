import express from "express";

import NotificationController from "../controllers/NotificationController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notifications
 *     description: Notification Management APIs
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Lấy danh sách thông báo
 *     description: Trả về toàn bộ thông báo của người dùng đang đăng nhập.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 *       401:
 *         description: Chưa đăng nhập
 *       500:
 *         description: Lỗi máy chủ
 */
router.get(
    "/",
    authMiddleware,
    NotificationController.getNotifications
);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Đánh dấu thông báo đã đọc
 *     description: Chuyển trạng thái thông báo từ chưa đọc sang đã đọc.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của thông báo
 *         schema:
 *           type: string
 *           example: "687000000000000000000501"
 *     responses:
 *       200:
 *         description: Đánh dấu đã đọc thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi máy chủ
 */
router.patch(
    "/:id/read",
    authMiddleware,
    NotificationController.markAsRead
);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Xóa thông báo
 *     description: Xóa một thông báo của người dùng.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của thông báo
 *         schema:
 *           type: string
 *           example: "687000000000000000000501"
 *     responses:
 *       200:
 *         description: Xóa thông báo thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy thông báo
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete(
    "/:id",
    authMiddleware,
    NotificationController.deleteNotification
);

export default router;