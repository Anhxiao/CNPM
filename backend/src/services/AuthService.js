import UserRepository from "../repositories/UserRepository.js";
import RefreshToken from "../models/RefreshToken.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/jwt.js";

import {
    hashPassword,
    comparePassword
} from "../utils/bcrypt.js";

class AuthService {

    async register(userData) {

        const {
            fullName,
            email,
            password,
            phone
        } = userData;

        const existingUser = await UserRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("Email đã tồn tại.");
        }

        const hashedPassword = await hashPassword(password);

        return await UserRepository.createUser({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

    }

    async login(email, password) {

        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng.");
        }

        const isMatch = await comparePassword(
            password,
            user.password
        );

        if (!isMatch) {
            throw new Error("Email hoặc mật khẩu không đúng.");
        }

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        await RefreshToken.create({
            userId: user._id,
            token: refreshToken,
            expiredAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        });

        return {
            user,
            accessToken,
            refreshToken
        };

    }

    async getProfile(userId) {

        const user = await UserRepository.findById(userId);

        if (!user) {
            throw new Error("Không tìm thấy người dùng.");
        }

        return user;

    }

    async refreshToken(token) {

        const tokenData = await RefreshToken.findOne({
            token
        });

        if (!tokenData) {

            throw new Error("Refresh Token không hợp lệ.");

        }

        if (tokenData.expiredAt < new Date()) {

            await RefreshToken.deleteOne({
                _id: tokenData._id
            });

            throw new Error("Refresh Token đã hết hạn.");

        }

        const user = await UserRepository.findById(
            tokenData.userId
        );

        if (!user) {
            throw new Error("Người dùng không tồn tại.");
        }

        return generateAccessToken(user);

    }

    async logout(refreshToken) {

        await RefreshToken.findOneAndDelete({
            token: refreshToken
        });

        return true;

    }

}

export default new AuthService();