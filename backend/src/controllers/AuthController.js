import AuthService from "../services/AuthService.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class AuthController {

    /**
     * Đăng ký tài khoản
     */
    async register(req, res) {

        try {

            const user = await AuthService.register(req.body);

            return successResponse(
                res,
                "Đăng ký tài khoản thành công.",
                user,
                201
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    /**
     * Đăng nhập
     */
    async login(req, res) {

        try {

            const { email, password } = req.body;

            const result = await AuthService.login(
                email,
                password
            );

            return successResponse(
                res,
                "Đăng nhập thành công.",
                result
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                401
            );

        }

    }

    /**
     * Lấy thông tin cá nhân
     */
    async profile(req, res) {

        try {

            const user = await AuthService.getProfile(
                req.user.id
            );

            return successResponse(
                res,
                "Lấy thông tin thành công.",
                user
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                404
            );

        }

    }

    /**
     * Refresh Token
     */
    async refreshToken(req, res) {

        try {

            const { refreshToken } = req.body;

            const accessToken = await AuthService.refreshToken(
                refreshToken
            );

            return successResponse(
                res,
                "Làm mới Access Token thành công.",
                {
                    accessToken
                }
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                401
            );

        }

    }

    /**
     * Đăng xuất
     */
    async logout(req, res) {

        try {

            const { refreshToken } = req.body;

            await AuthService.logout(refreshToken);

            return successResponse(
                res,
                "Đăng xuất thành công."
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

}

export default new AuthController();