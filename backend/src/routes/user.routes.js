import express from "express";

import UserController from "../controllers/UserController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

import {
    updateUserValidation,
    changePasswordValidation
} from "../validations/user.validation.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User Management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     description: Chỉ Admin mới được phép xem toàn bộ danh sách người dùng.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền truy cập
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    UserController.getAllUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     description: Trả về thông tin chi tiết của người dùng.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get(
    "/:id",
    authMiddleware,
    UserController.getUserById
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     description: Cập nhật họ tên, số điện thoại hoặc các thông tin khác.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.put(
    "/:id",
    authMiddleware,
    updateUserValidation,
    validationMiddleware,
    UserController.updateUser
);

/**
 * @swagger
 * /users/change-password:
 *   put:
 *     summary: Đổi mật khẩu
 *     description: Người dùng thay đổi mật khẩu tài khoản.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "654321"
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Mật khẩu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập
 */
router.put(
    "/change-password",
    authMiddleware,
    changePasswordValidation,
    validationMiddleware,
    UserController.changePassword
);

/**
 * @swagger
 * /users/avatar:
 *   put:
 *     summary: Cập nhật ảnh đại diện
 *     description: Upload và cập nhật avatar của người dùng.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật avatar thành công
 *       401:
 *         description: Chưa đăng nhập
 */
router.put(
    "/avatar",
    authMiddleware,
    UserController.updateAvatar
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: Chỉ Admin mới có quyền xóa tài khoản người dùng.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       401:
 *         description: Chưa đăng nhập
 *       403:
 *         description: Không có quyền
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    UserController.deleteUser
);

export default router;