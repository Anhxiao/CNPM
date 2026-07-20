import express from "express";

import CommentController from "../controllers/CommentController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

import {
    createCommentValidation
} from "../validations/comment.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Comment Management APIs
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Tạo bình luận mới
 *     description: Thêm một bình luận vào Task.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Tạo bình luận thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */
router.post(
    "/",
    authMiddleware,
    createCommentValidation,
    validationMiddleware,
    CommentController.createComment
);

/**
 * @swagger
 * /comments/task/{taskId}:
 *   get:
 *     summary: Danh sách bình luận của Task
 *     description: Lấy toàn bộ bình luận thuộc một Task.
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: ID của Task
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy Task
 */
router.get(
    "/task/:taskId",
    authMiddleware,
    CommentController.getComments
);

export default router;