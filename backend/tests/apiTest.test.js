const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../server");
const User = require("../models/userSchema");
const dotenv = require("dotenv");
dotenv.config();

describe("User API endpoints", () => {
  // Test case for getting all users
  it("should get all users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should create a new user", async () => {
    const userData = {
      username: "user",
      email: "user@email.com",
      password: "password",
    };

    const res = await request(server).post("/api/users").send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.username).toEqual(userData.username);
    expect(res.body.email).toEqual(userData.email);

    newUser = res.body;
  });

  it("should get a single user", async () => {
    // Make sure a user has been created in the previous test
    expect(newUser).toBeDefined();

    const res = await request(server).get(`/api/users/${createdUser._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", createdUser._id);
    expect(res.body.username).toEqual(createdUser.username);
    expect(res.body.email).toEqual(createdUser.email);
  });
});

// close the server afterward
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
