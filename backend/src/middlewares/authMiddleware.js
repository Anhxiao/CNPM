import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Không tìm thấy Access Token."

            });

        }

        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Định dạng Token không hợp lệ."

            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(

            token,

            env.jwtSecret

        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Access Token không hợp lệ hoặc đã hết hạn."

        });

    }

};

export default authMiddleware;