import express from "express";

import AuthController from "../controllers/AuthController.js";

import {
    registerValidation,
    loginValidation
} from "../validations/auth.validation.js";

import validationMiddleware from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Quản lý xác thực người dùng
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     description: Tạo tài khoản người dùng mới.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc Email đã tồn tại
 */
router.post(
    "/register",
    registerValidation,
    validationMiddleware,
    AuthController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập
 *     description: Đăng nhập và nhận Access Token cùng Refresh Token.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai Email hoặc mật khẩu
 */
router.post(
    "/login",
    loginValidation,
    validationMiddleware,
    AuthController.login
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Làm mới Access Token
 *     description: Sinh Access Token mới từ Refresh Token.
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIs...
 *     responses:
 *       200:
 *         description: Access Token mới
 *       401:
 *         description: Refresh Token không hợp lệ
 */
router.post(
    "/refresh-token",
    AuthController.refreshToken
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Đăng xuất
 *     description: Hủy Refresh Token của người dùng.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIs...
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       401:
 *         description: Chưa đăng nhập
 */
router.post(
    "/logout",
    authMiddleware,
    AuthController.logout
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     description: Trả về thông tin của tài khoản đang đăng nhập.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       401:
 *         description: Token không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get(
    "/profile",
    authMiddleware,
    AuthController.profile
);

export default router;