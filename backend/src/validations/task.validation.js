import { body } from "express-validator";

/*
----------------------------------
Tạo Task
----------------------------------
*/

export const createTaskValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Tên công việc không được để trống.")
        .isLength({ min: 3, max: 200 })
        .withMessage("Tên công việc phải từ 3 đến 200 ký tự."),

    body("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Mô tả tối đa 1000 ký tự."),

    body("project")
        .notEmpty()
        .withMessage("Project không được để trống.")
        .isMongoId()
        .withMessage("Project ID không hợp lệ."),

    body("assignee")
        .optional()
        .isMongoId()
        .withMessage("Assignee không hợp lệ."),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High",
            "Urgent"
        ])
        .withMessage("Priority không hợp lệ."),

    body("status")
        .optional()
        .isIn([
            "Todo",
            "In Progress",
            "Review",
            "Completed",
            "Cancelled"
        ])
        .withMessage("Status không hợp lệ."),

    body("progress")
        .optional()
        .isInt({
            min: 0,
            max: 100
        })
        .withMessage("Progress phải từ 0 đến 100."),

    body("startDate")
        .optional()
        .isISO8601()
        .withMessage("Ngày bắt đầu không hợp lệ."),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Deadline không hợp lệ."),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags phải là mảng.")

];

/*
----------------------------------
Cập nhật Task
----------------------------------
*/

export const updateTaskValidation = [

    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage("Tên công việc phải từ 3 đến 200 ký tự."),

    body("description")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("Mô tả tối đa 1000 ký tự."),

    body("assignee")
        .optional()
        .isMongoId()
        .withMessage("Assignee không hợp lệ."),

    body("priority")
        .optional()
        .isIn([
            "Low",
            "Medium",
            "High",
            "Urgent"
        ])
        .withMessage("Priority không hợp lệ."),

    body("status")
        .optional()
        .isIn([
            "Todo",
            "In Progress",
            "Review",
            "Completed",
            "Cancelled"
        ])
        .withMessage("Status không hợp lệ."),

    body("progress")
        .optional()
        .isInt({
            min: 0,
            max: 100
        })
        .withMessage("Progress phải từ 0 đến 100."),

    body("startDate")
        .optional()
        .isISO8601()
        .withMessage("Ngày bắt đầu không hợp lệ."),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Deadline không hợp lệ."),

    body("tags")
        .optional()
        .isArray()
        .withMessage("Tags phải là mảng.")

];