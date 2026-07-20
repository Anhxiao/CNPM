import request from "supertest";
import app from "../app.js";

describe("Task API", () => {

    test("Lấy danh sách Task", async () => {

        const response = await request(app)

            .get("/api/tasks");

        expect([200,401]).toContain(response.statusCode);

    });

});