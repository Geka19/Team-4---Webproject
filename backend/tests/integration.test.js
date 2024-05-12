const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../server");

describe("Integration tests for server endpoints", () => {
  it("GET /api/auth/login should return 404", async () => {
    const response = await request(server).get("/api/auth/login");
    expect(response.status).toBe(404);
  });

  it("POST /api/auth/register should return 400 for invalid input", async () => {
    const response = await request(server).post("/api/auth/register").send({}); // Send empty body to trigger validation error
    expect(response.status).toBe(400);
  });
});

// Close the server and MongoDB connection after running the tests
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
