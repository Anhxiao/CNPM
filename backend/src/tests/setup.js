import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";


beforeAll(async () => {

    await connectDatabase();

});


afterAll(async () => {

    if (mongoose.connection.readyState !== 0) {

        await mongoose.connection.close();

    }

});