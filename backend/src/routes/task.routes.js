import express from "express";

import TaskController from "../controllers/TaskController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

import {
    createTaskValidation,
    updateTaskValidation
} from "../validations/task.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task Management APIs
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Tạo công việc mới
 *     description: Tạo một công việc thuộc một dự án của người dùng đang đăng nhập.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tạo công việc thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */
router.post(
    "/",
    authMiddleware,
    createTaskValidation,
    validationMiddleware,
    TaskController.createTask
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lấy danh sách công việc
 *     description: Lấy các công việc thuộc những dự án của người dùng đang đăng nhập.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: false
 *         schema:
 *           type: string
 *         description: Lọc công việc theo dự án
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - Todo
 *             - In Progress
 *             - Review
 *             - Completed
 *             - Cancelled
 *         description: Lọc theo trạng thái
 *       - in: query
 *         name: priority
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - Low
 *             - Medium
 *             - High
 *             - Urgent
 *         description: Lọc theo mức độ ưu tiên
 *       - in: query
 *         name: assignee
 *         required: false
 *         schema:
 *           type: string
 *         description: Lọc theo người được giao
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên công việc
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Lấy danh sách công việc thành công
 *       401:
 *         description: Chưa đăng nhập
 */
router.get(
    "/",
    authMiddleware,
    TaskController.getTasks
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Lấy chi tiết công việc
 *     description: Lấy thông tin một công việc thuộc dự án của người dùng.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công việc
 *     responses:
 *       200:
 *         description: Lấy thông tin công việc thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy công việc
 */
router.get(
    "/:id",
    authMiddleware,
    TaskController.getTaskById
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Cập nhật công việc
 *     description: Cập nhật thông tin công việc thuộc dự án của người dùng.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công việc
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Cập nhật công việc thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy công việc
 */
router.put(
    "/:id",
    authMiddleware,
    updateTaskValidation,
    validationMiddleware,
    TaskController.updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Xóa công việc
 *     description: Xóa mềm công việc khỏi danh sách đang hoạt động.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công việc
 *     responses:
 *       200:
 *         description: Xóa công việc thành công
 *       400:
 *         description: Không thể xóa công việc
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy công việc
 */
router.delete(
    "/:id",
    authMiddleware,
    TaskController.deleteTask
);

/**
 * @swagger
 * /tasks/{id}/restore:
 *   patch:
 *     summary: Khôi phục công việc
 *     description: Khôi phục công việc đã bị xóa mềm.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công việc
 *     responses:
 *       200:
 *         description: Khôi phục công việc thành công
 *       400:
 *         description: Không thể khôi phục công việc
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy công việc
 */
router.patch(
    "/:id/restore",
    authMiddleware,
    TaskController.restoreTask
);

export default router;