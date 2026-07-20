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
 *     summary: Tạo Task mới
 *     description: Tạo một công việc mới trong Project.
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
 *         description: Tạo Task thành công
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
 *     summary: Lấy danh sách Task
 *     description: Trả về toàn bộ Task của người dùng.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách Task
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
 *     summary: Lấy chi tiết Task
 *     description: Trả về thông tin chi tiết của Task.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của Task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy Task
 *       401:
 *         description: Chưa đăng nhập
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
 *     summary: Cập nhật Task
 *     description: Chỉnh sửa thông tin Task.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy Task
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
 *     summary: Xóa mềm Task
 *     description: Đánh dấu Task là đã xóa.
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
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy Task
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
 *     summary: Khôi phục Task
 *     description: Khôi phục Task đã bị xóa mềm.
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
 *     responses:
 *       200:
 *         description: Khôi phục thành công
 *       404:
 *         description: Không tìm thấy Task
 */
router.patch(
    "/:id/restore",
    authMiddleware,
    TaskController.restoreTask
);

export default router;