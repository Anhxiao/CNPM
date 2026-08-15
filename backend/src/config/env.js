import dotenv from "dotenv";

dotenv.config();

export const env = {

    port: process.env.PORT || 5000,

    nodeEnv: process.env.NODE_ENV || "development",

    mongoUri: process.env.MONGO_URI,

    databaseName: process.env.DB_NAME,

    jwtSecret: process.env.JWT_SECRET,

    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",

    refreshTokenExpires: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

    emailUser: process.env.EMAIL_USER,

    emailPass: process.env.EMAIL_PASS

};