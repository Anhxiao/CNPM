import { body } from "express-validator";

export const createNotificationValidation = [

    body("title")

        .notEmpty()

        .withMessage("Tiêu đề không được để trống."),

    body("message")

        .notEmpty()

        .withMessage("Nội dung không được để trống.")

];