const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const server = require("../server");
const User = require("../models/userSchema");

// Function to register a new user and return the user object
const registerUser = async () => {
  const registerResponse = await request(server)
    .post("/api/auth/register")
    .send({
      username: "JohnDoe",
      email: "john@email.com",
      password: "test123456789",
    });

  const userId = registerResponse.body.userId;
  return await User.findById(userId);
};

// Test the user API endpoints
describe("User API endpoints", () => {
  // Define a test user
  let user;

  // Register a test user before running the tests
  beforeAll(async () => {
    user = await registerUser();
  });

  // Test case for getting all users
  it("should get all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test case for logging in a user
  it("should log in a user", async () => {
    const res = await request(server).post("/api/auth/login").send({
      email: "john@email.com",
      password: "test123456789",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Login successful");
  });

  // Test case for logging out a user
  it("should log out a user", async () => {
    const res = await request(server).post("/api/auth/logout");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logout successful");
  });

  // Test case for getting a user by ID
  it("should get a user by ID", async () => {
    const res = await request(server).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", user._id.toString());
    expect(res.body.username).toEqual(user.username);
    expect(res.body.email).toEqual(user.email);
  });

  // Test case for updating a user
  it("should update a user", async () => {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    const res = await request(server)
      .put(`/api/users/${user._id}`)
      .set("Cookie", `auth-token=${token}`)
      .send({
        username: "UpdatedUsername",
        email: "updatedemail@example.com",
        role: "updatedRole",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("username", "UpdatedUsername");
    expect(res.body).toHaveProperty("email", "updatedemail@example.com");
    expect(res.body).toHaveProperty("role", "updatedRole");
  });

  // Test case for deleting a user
  it("should delete a user", async () => {
    const res = await request(server).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted");
  });
});

// Close the server and MongoDB connection after running the tests
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
