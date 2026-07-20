import User from "../models/User.js";

class UserRepository {

    /*
    ==========================================
    Create User
    ==========================================
    */

    async createUser(userData) {

        return await User.create(userData);

    }

    /*
    ==========================================
    Find By Email
    ==========================================
    */

    async findByEmail(email) {

    try {

        const user = await User
            .findOne({
                email: email.trim().toLowerCase()
            })
            .exec();

        return user;

    } 
    
    catch (error) {

        console.error(
            "Find user by email error:",
            error.message
        );


        throw error;

    }

}

    /*
    ==========================================
    Find By Id
    ==========================================
    */

    async findById(id) {

        return await User.findById(id).exec();

    }

    /*
    ==========================================
    Get All Users
    ==========================================
    */

    async getAllUsers() {

        return await User.find().exec();

    }

    /*
    ==========================================
    Update User
    ==========================================
    */

    async updateUser(id, data) {

        return await User.findByIdAndUpdate(

            id,

            data,

            {

                new: true,

                runValidators: true

            }

        ).exec();

    }

    /*
    ==========================================
    Update Avatar
    ==========================================
    */

    async updateAvatar(id, avatar) {

        return await User.findByIdAndUpdate(

            id,

            {

                avatar

            },

            {

                new: true

            }

        ).exec();

    }

    /*
    ==========================================
    Update Password
    ==========================================
    */

    async updatePassword(id, password) {

        return await User.findByIdAndUpdate(

            id,

            {

                password

            },

            {

                new: true

            }

        ).exec();

    }

    /*
    ==========================================
    Delete User
    ==========================================
    */

    async deleteUser(id) {

        return await User.findByIdAndDelete(id).exec();

    }

}

export default new UserRepository();