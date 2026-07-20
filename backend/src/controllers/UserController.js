import UserService from "../services/UserService.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class UserController {

    /**
     * Lấy danh sách người dùng
     */
    async getAllUsers(req, res) {

        try {

            const users = await UserService.getAllUsers();

            return successResponse(
                res,
                "Lấy danh sách người dùng thành công.",
                users
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                500
            );

        }

    }

    /**
     * Lấy thông tin theo ID
     */
    async getUserById(req, res) {

        try {

            const { id } = req.params;

            const user = await UserService.getUserById(id);

            return successResponse(
                res,
                "Lấy thông tin người dùng thành công.",
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
     * Cập nhật thông tin
     */
    async updateUser(req, res) {

        try {

            const { id } = req.params;

            const updatedUser = await UserService.updateUser(
                id,
                req.body
            );

            return successResponse(
                res,
                "Cập nhật thành công.",
                updatedUser
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
     * Đổi mật khẩu
     */
    async changePassword(req, res) {

        try {

            const { newPassword } = req.body;

            await UserService.changePassword(
                req.user.id,
                newPassword
            );

            return successResponse(
                res,
                "Đổi mật khẩu thành công."
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
     * Cập nhật avatar
     */
    async updateAvatar(req, res) {

        try {

            if (!req.file) {

                return errorResponse(
                    res,
                    "Chưa chọn ảnh."
                );

            }

            const avatar = req.file.filename;

            const result = await UserService.updateAvatar(
                req.user.id,
                avatar
            );

            return successResponse(
                res,
                "Cập nhật ảnh đại diện thành công.",
                result
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
     * Xóa người dùng
     */
    async deleteUser(req, res) {

        try {

            const { id } = req.params;

            await UserService.deleteUser(id);

            return successResponse(
                res,
                "Xóa người dùng thành công."
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

export default new UserController();