const request = require("supertest");
const server = require("../server");
const Board = require("../models/boardSchema");
const mongoose = require("mongoose");

// Test the board API endpoints
describe("Board API endpoints", () => {
  // Test case for creating a new board
  it("should create a new board", async () => {
    const res = await request(server).post("/api/boards").send({
      title: "Test Board",
      description: "Test Description",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Board created successfully");
  });

  // Test case for getting all boards
  it("should get all boards", async () => {
    const res = await request(server).get("/api/boards");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test case for getting a specific board
  it("should get a specific board", async () => {
    const board = await Board.findOne({ title: "Test Board" });

    const res = await request(server).get(`/api/boards/${board._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", board._id.toString());
  });

  // Test case for updating a board
  it("should update a board", async () => {
    const board = await Board.findOne({ title: "Test Board" });

    const res = await request(server).put(`/api/boards/${board._id}`).send({
      title: "Updated Test Board",
      description: "Updated Test Description",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Test Board");
    expect(res.body).toHaveProperty("description", "Updated Test Description");
  });

  // Test case for deleting a board
  it("should delete a board", async () => {
    const board = await Board.findOne({ title: "Updated Test Board" });

    const res = await request(server).delete(`/api/boards/${board._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Board deleted");
  });
});

// close the server afterward
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
