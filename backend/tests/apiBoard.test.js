const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const server = require("../server");
const User = require("../models/userSchema"); // Import the User model
const Board = require("../models/boardSchema");

// Test the board API endpoints
describe("Board API endpoints", () => {
  // Define a test user
  let user;

  // Create a test user before running the tests
  beforeAll(async () => {
    user = new User({
      username: "test",
      email: "test@email.com",
      password: "test",
    });
    await user.save();
  });

  // Test case for creating a new board
  it("should create a new board", async () => {
    // Create a token for the test user
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // Make a request to create a board with the token
    const res = await request(server)
      .post("/api/boards")
      .set("Cookie", `auth-token=${token}`)
      .send({
        title: "Test Board",
        description: "Test Description",
        user: user._id,
      });

    // Check that the board was created successfully
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
    await User.findByIdAndDelete(user._id);
  });
});

// Close the server and MongoDB connection after running the tests
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
