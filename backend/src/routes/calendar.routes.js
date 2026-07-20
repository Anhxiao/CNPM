import express from "express";

import CalendarController from "../controllers/CalendarController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Calendar
 *     description: Calendar Management APIs
 */

/**
 * @swagger
 * /calendar:
 *   get:
 *     summary: Lấy dữ liệu lịch làm việc
 *     description: Trả về danh sách Project và Task để hiển thị trên giao diện Calendar.
 *     tags:
 *       - Calendar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy dữ liệu Calendar thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalendarResponse'
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi máy chủ
 */
router.get(
    "/",
    authMiddleware,
    CalendarController.getCalendar
);

export default router;