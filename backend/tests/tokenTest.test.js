const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../server");
const User = require("../models/userSchema"); 
const dotenv = require("dotenv");
dotenv.config();


// Testing if the jwt token is valid and working
describe("Auth middleware", () => {
  it("should verify a valid token", async () => {
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
    const res = await request(app)
      .get("/api/auth/verify")
      .set("Cookie", `authToken=${token}`);

    // Check that the request was successful
    expect(res.statusCode).toEqual(200);

    // Delete the user afterwards 
    await User.findByIdAndDelete(user._id);
  }); 

  // Checking if it rejects an invalid web token
  it("should reject an invalid token", async () => {
    // Make a request to a protected route with an invalid token
    const res = await request(app)
      .get("/api/auth/verify")
      .set("Cookie", "authToken=invalid");

    // Check that the request was unauthorized
    expect(res.statusCode).toEqual(401);
  }); 
});
