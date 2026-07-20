import request from "supertest";
import app from "../app.js";

describe("Project API", () => {

    test("Không có Token", async () => {

        const response = await request(app)

            .get("/api/projects");

        expect(response.statusCode).toBe(401);

    });

});