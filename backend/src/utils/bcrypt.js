import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Mã hóa mật khẩu
 */

export const hashPassword = async (password) => {

    return await bcrypt.hash(

        password,

        SALT_ROUNDS

    );

};

/**
 * So sánh mật khẩu
 */

export const comparePassword = async (

    password,

    hash

) => {

    return await bcrypt.compare(

        password,

        hash

    );

};