import request from "supertest";
import mongoose from "mongoose";

import app from "../app.js";

describe("Authentication API", () => {

    /**
     * ==============================
     * REGISTER TEST
     * ==============================
     */

    describe("POST /api/auth/register", () => {

        test("Đăng ký thiếu dữ liệu", async () => {

            const response = await request(app)
                .post("/api/auth/register")
                .send({});

            expect(response.statusCode)
                .toBe(400);

            expect(response.body)
                .toHaveProperty("message");

        });

    });

    describe("POST /api/auth/login", () => {

        test("Đăng nhập sai tài khoản", async () => {

            const response = await request(app)
                .post("/api/auth/login")
                .send({

                    email: "wrong_account@gmail.com",

                    password: "wrong_password"

                });

            expect(response.statusCode)
                .toBe(401);

            expect(response.body)
                .toHaveProperty("message");

        });

        test("Đăng nhập thiếu email và password", async () => {

            const response = await request(app)
                .post("/api/auth/login")
                .send({});

            expect(response.statusCode)
                .toBe(400);

            expect(response.body)
                .toHaveProperty("message");

        });

    });

});

afterAll(async () => {

    if (mongoose.connection.readyState !== 0) {

        await mongoose.connection.close();

    }
    
});