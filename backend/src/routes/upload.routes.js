import express from "express";

import UploadController from "../controllers/UploadController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
    uploadAvatar,
    uploadAttachment
} from "../middlewares/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Upload
 *     description: File Upload APIs
 */

/**
 * @swagger
 * /upload/avatar:
 *   post:
 *     summary: Upload ảnh đại diện
 *     description: Upload ảnh đại diện của người dùng.
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Ảnh đại diện
 *     responses:
 *       200:
 *         description: Upload avatar thành công
 *       400:
 *         description: File không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       500:
 *         description: Lỗi máy chủ
 */
router.post(
    "/avatar",
    authMiddleware,
    uploadAvatar,
    UploadController.uploadAvatar
);

/**
 * @swagger
 * /upload/attachment:
 *   post:
 *     summary: Upload tệp đính kèm
 *     description: Upload file đính kèm cho Project hoặc Task.
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - attachment
 *             properties:
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 description: File đính kèm
 *     responses:
 *       200:
 *         description: Upload file thành công
 *       400:
 *         description: File không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 *       500:
 *         description: Lỗi máy chủ
 */
router.post(
    "/attachment",
    authMiddleware,
    uploadAttachment,
    UploadController.uploadAttachment
);

export default router;