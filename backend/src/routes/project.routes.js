import express from "express";

import ProjectController from "../controllers/ProjectController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

import {
    createProjectValidation,
    updateProjectValidation
} from "../validations/project.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Project Management APIs
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Tạo Project mới
 *     description: Tạo một dự án mới cho người dùng đang đăng nhập.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Tạo Project thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */
router.post(
    "/",
    authMiddleware,
    createProjectValidation,
    validationMiddleware,
    ProjectController.createProject
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lấy danh sách Project
 *     description: Trả về tất cả Project của người dùng.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách Project
 *       401:
 *         description: Chưa đăng nhập
 */
router.get(
    "/",
    authMiddleware,
    ProjectController.getProjects
);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Lấy chi tiết Project
 *     description: Lấy thông tin chi tiết của một Project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của Project
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy Project
 */
router.get(
    "/:id",
    authMiddleware,
    ProjectController.getProjectById
);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Cập nhật Project
 *     description: Cập nhật thông tin Project.
 *     tags:
 *       - Projects
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
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy Project
 */
router.put(
    "/:id",
    authMiddleware,
    updateProjectValidation,
    validationMiddleware,
    ProjectController.updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Xóa mềm Project
 *     description: Đánh dấu Project là đã xóa.
 *     tags:
 *       - Projects
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
 *         description: Xóa Project thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy Project
 */
router.delete(
    "/:id",
    authMiddleware,
    ProjectController.deleteProject
);

/**
 * @swagger
 * /projects/{id}/restore:
 *   patch:
 *     summary: Khôi phục Project
 *     description: Khôi phục Project đã bị xóa mềm.
 *     tags:
 *       - Projects
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
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy Project
 */
router.patch(
    "/:id/restore",
    authMiddleware,
    ProjectController.restoreProject
);

export default router;