import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Tạo Access Token
 */
export const generateAccessToken = (user) => {

    return jwt.sign(

        {
            id: user._id,
            email: user.email,
            role: user.role
        },

        env.jwtSecret,

        {
            expiresIn: env.jwtExpiresIn
        }

    );

};

/**
 * Tạo Refresh Token
 */
export const generateRefreshToken = (user) => {

    return jwt.sign(

        {
            id: user._id
        },

        env.jwtSecret,

        {
            expiresIn: env.refreshTokenExpires
        }

    );

};

/**
 * Kiểm tra Access Token
 */

export const verifyToken = (token) => {

    return jwt.verify(

        token,

        env.jwtSecret

    );

};