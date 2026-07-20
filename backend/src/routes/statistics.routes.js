import express from "express";

import StatisticsController from "../controllers/StatisticsController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Statistics
 *     description: Statistics and Dashboard APIs
 */

/**
 * @swagger
 * /statistics/dashboard:
 *   get:
 *     summary: Thống kê Dashboard
 *     description: Lấy dữ liệu tổng quan của Dashboard, bao gồm số lượng Project, Task, Task hoàn thành, Task đang thực hiện, Task quá hạn và tỷ lệ hoàn thành.
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thống kê Dashboard thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardStatistics'
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi máy chủ
 */
router.get(
    "/dashboard",
    authMiddleware,
    StatisticsController.getDashboard
);

export default router;