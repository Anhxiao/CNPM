import { body } from "express-validator";

/*
----------------------------------
Cập nhật thông tin cá nhân
----------------------------------
*/

export const updateUserValidation = [

    body("fullName")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Họ tên phải từ 3 đến 100 ký tự."),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Email không hợp lệ."),

    body("phone")
        .optional()
        .isMobilePhone("vi-VN")
        .withMessage("Số điện thoại không hợp lệ.")

];


/*
----------------------------------
Đổi mật khẩu
----------------------------------
*/

export const changePasswordValidation = [

    body("newPassword")
        .notEmpty()
        .withMessage("Mật khẩu mới không được để trống.")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự.")

];