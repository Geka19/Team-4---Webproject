const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const server = require("../server");
const User = require("../models/userSchema");
const dotenv = require("dotenv");
dotenv.config();

// One issue now is that the tests are not running in parallel which jest normally does
// I added this setting in the package.json "test": "jest --runInBand" which means it runs 1 at a time
// This makes it a lot slower than it should be. Need someway to allocate a different port for each test file
// The issue now is at that if we try running them in parallel we get an error because the port is already in use

describe("User API endpoints", () => {
  // Test case for getting all users
  it("should get all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Test case for registering a new user
  it("should register a new user", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "JohnDoe",
      email: "john@email.com",
      password: "test123456789",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body).toHaveProperty("userId");
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

  it("should log out a user", async () => {
    const res = await request(server).post("/api/auth/logout");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logout successful");
  });

  // Test case for logging in a user
  it("should get a user by ID", async () => {
    const user = await User.findOne({ username: "JohnDoe" });

    const res = await request(server).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", user._id.toString());
    expect(res.body.username).toEqual(user.username);
    expect(res.body.email).toEqual(user.email);
  });

  // Test case for updating a user
  it("should update a user", async () => {
    const user = await User.findOne({ username: "JohnDoe" });
    const res = await request(server).put(`/api/users/${user._id}`).send({
      username: "JaneDoe",
      email: "jane@email.com",
      role: "User",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual("JaneDoe");
    expect(res.body.email).toEqual("jane@email.com");
  });

  // Not able to register an existing user
  it("should reject an invalid registration with existing user email", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "JaneDoe",
      email: "jane@email.com",
      password: "test123456789",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Email already exists");
  });

  // Test case for deleting a user
  it("should delete a user", async () => {
    const user = await User.findOne({ username: "JaneDoe" });
    const res = await request(server).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User deleted");
  });

  it("should get the user role", async () => {
    // Create a test user
    const user = new User({
      username: "test",
      email: "test@email.com",
      password: "test",
    });
    await user.save();

    // Create a token for the test user
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // Make a request to a protected route with the token
    const res = await request(server)
      .get("/api/auth/role")
      .set("Cookie", `authToken=${token}`);

    // Check that the request was successful
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("userRole", user.role);
    expect(res.body).toHaveProperty("message", "Role fetched");

    // Delete the test user afterwards
    await User.findByIdAndDelete(user._id);
  });

  // Checking if it rejects an invalid web token
  it("should reject an invalid token", async () => {
    // Make a request to a protected route with an invalid token
    const res = await request(server)
      .get("/api/auth/verify")
      .set("Cookie", "authToken=invalid");

    // Check that the request was unauthorized
    expect(res.statusCode).toEqual(401);
  });

  // Checking if it rejects a a user with invalid email
  it("should reject registration with invalid email format", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "Test User",
      email: "invalid-email",
      password: "test123456789",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0]).toHaveProperty("msg", "Invalid email");
  });

  // Login unsuccessful
  it("should reject an invalid login", async () => {
    const res = await request(server).post("/api/auth/login").send({
      email: "invalid@invalid.com",
      password: "invalid!",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  // close the server afterward
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});
