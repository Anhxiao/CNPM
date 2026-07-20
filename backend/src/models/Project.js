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

/*
----------------------------------
Lấy danh sách User
----------------------------------
*/

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    UserController.getAllUsers
);

/*
----------------------------------
Lấy User theo ID
----------------------------------
*/

router.get(
    "/:id",
    authMiddleware,
    UserController.getUserById
);

/*
----------------------------------
Cập nhật User
----------------------------------
*/

router.put(
    "/:id",
    authMiddleware,
    updateUserValidation,
    validationMiddleware,
    UserController.updateUser
);

/*
----------------------------------
Đổi mật khẩu
----------------------------------
*/

router.put(
    "/change-password",
    authMiddleware,
    changePasswordValidation,
    validationMiddleware,
    UserController.changePassword
);

/*
----------------------------------
Cập nhật Avatar
----------------------------------
*/

router.put(
    "/avatar",
    authMiddleware,
    UserController.updateAvatar
);

/*
----------------------------------
Xóa User
----------------------------------
*/

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    UserController.deleteUser
);

export default router;