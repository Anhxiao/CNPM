import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: env.emailUser,

        pass: env.emailPass

    }

});

export const verifyMail = async () => {

    try {

        await transporter.verify();

        console.log("SMTP Connected");

    }

    catch (error) {

        console.error(error.message);

    }

};