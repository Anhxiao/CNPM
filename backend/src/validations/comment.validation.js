import { body } from "express-validator";

export const createCommentValidation=[

    body("task")

    .notEmpty()

    .isMongoId()

    .withMessage("Task không hợp lệ."),

    body("content")

    .trim()

    .notEmpty()

    .isLength({

        min:1,

        max:1000

    })

    .withMessage("Nội dung từ 1-1000 ký tự.")

];