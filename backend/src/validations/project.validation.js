import { body } from "express-validator";

/*
----------------------------------
Tạo Project
----------------------------------
*/

export const createProjectValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Tên dự án không được để trống.")
        .isLength({ min: 3, max: 200 })
        .withMessage("Tên dự án phải từ 3 đến 200 ký tự."),

    body("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Mô tả tối đa 1000 ký tự."),

    body("status")
        .optional()
        .isIn([
            "Planning",
            "In Progress",
            "Completed",
            "Cancelled"
        ])
        .withMessage("Trạng thái không hợp lệ."),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High"
        ])
        .withMessage("Mức ưu tiên không hợp lệ."),

    body("startDate")
        .optional()
        .isISO8601()
        .withMessage("Ngày bắt đầu không hợp lệ."),

    body("endDate")
        .optional()
        .isISO8601()
        .withMessage("Ngày kết thúc không hợp lệ."),

    body("progress")
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage("Tiến độ phải từ 0 đến 100.")

];

/*
----------------------------------
Cập nhật Project
----------------------------------
*/

export const updateProjectValidation = [

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage("Tên dự án phải từ 3 đến 200 ký tự."),

    body("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Mô tả tối đa 1000 ký tự."),

    body("status")
        .optional()
        .isIn([
            "Planning",
            "In Progress",
            "Completed",
            "Cancelled"
        ])
        .withMessage("Trạng thái không hợp lệ."),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High"
        ])
        .withMessage("Mức ưu tiên không hợp lệ."),

    body("startDate")
        .optional()
        .isISO8601()
        .withMessage("Ngày bắt đầu không hợp lệ."),

    body("endDate")
        .optional()
        .isISO8601()
        .withMessage("Ngày kết thúc không hợp lệ."),

    body("progress")
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage("Tiến độ phải từ 0 đến 100.")

];