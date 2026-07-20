import mongoose from "mongoose";
import { env } from "./env.js";

mongoose.set("strictQuery", true);

export const connectDatabase = async () => {

    try {

        if (!env.mongoUri) {

            throw new Error("MONGO_URI chưa được cấu hình.");

        }

        // Nếu đã kết nối thì không kết nối lại
        if (mongoose.connection.readyState === 1) {

            return;

        }

        const connection = await mongoose.connect(

            env.mongoUri,

            {
                dbName: env.databaseName,
                serverSelectionTimeoutMS: 5000
            }

        );

        console.log("======================================");
        console.log(" MongoDB Connected Successfully");
        console.log(` Database : ${connection.connection.name}`);
        console.log(` Host     : ${connection.connection.host}`);
        console.log(` Port     : ${connection.connection.port}`);
        console.log("======================================");


        mongoose.connection.on("disconnected", () => {

            console.log("MongoDB Disconnected");

        });


        mongoose.connection.on("reconnected", () => {

            console.log("MongoDB Reconnected");

        });


        mongoose.connection.on("error", (error) => {

            console.error(
                "MongoDB Error:",
                error.message
            );

        });

    }

    catch (error) {


        console.error("======================================");
        console.error(" MongoDB Connection Failed");
        console.error(error.message);
        console.error("======================================");


        // Không kill Jest khi test
        if (process.env.NODE_ENV !== "test") {

            process.exit(1);

        }


        throw error;

    }

};


export const closeDatabase = async () => {

    if (mongoose.connection.readyState !== 0) {

        await mongoose.connection.close();

        console.log(
            "MongoDB connection closed"
        );

    }

};


export default connectDatabase;