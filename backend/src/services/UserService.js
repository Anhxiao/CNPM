import UserRepository from "../repositories/UserRepository.js";
import { hashPassword } from "../utils/bcrypt.js";

class UserService {

    async getAllUsers() {

        return await UserRepository.getAllUsers();

    }

    async getUserById(id) {

        const user = await UserRepository.findById(id);

        if (!user) {

            throw new Error("Không tìm thấy người dùng.");

        }

        return user;

    }

    async updateUser(id, data) {

        const updatedUser = await UserRepository.updateUser(id, data);

        if (!updatedUser) {

            throw new Error("Không thể cập nhật người dùng.");

        }

        return updatedUser;

    }

    async changePassword(id, newPassword) {

        const password = await hashPassword(newPassword);

        return await UserRepository.updatePassword(

            id,

            password

        );

    }

    async updateAvatar(id, avatar) {

        return await UserRepository.updateAvatar(

            id,

            avatar

        );

    }

    async deleteUser(id) {

        return await UserRepository.deleteUser(id);

    }

}

export default new UserService();