import request from "supertest";
import app from "../app.js";

describe("Notification API", () => {

    test("Lấy Notification", async () => {

        const response = await request(app)

            .get("/api/notifications");

        expect([200,401]).toContain(response.statusCode);

    });

});