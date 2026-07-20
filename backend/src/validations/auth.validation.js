import { body } from "express-validator";

export const registerValidation = [

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Họ tên không được để trống")
        .isLength({ min: 3, max: 100 })
        .withMessage("Họ tên phải từ 3 đến 100 ký tự"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email không được để trống")
        .isEmail()
        .withMessage("Email không hợp lệ")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Mật khẩu không được để trống")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),

    body("phone")
        .optional()
        .isMobilePhone("vi-VN")
        .withMessage("Số điện thoại không hợp lệ")

];

export const loginValidation = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email không được để trống")
        .isEmail()
        .withMessage("Email không hợp lệ"),

    body("password")
        .notEmpty()
        .withMessage("Mật khẩu không được để trống")

];