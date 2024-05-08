const request = require("supertest");
const server = require("../server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("Note API", () => {
  it("should fail to create a note with title and content length exceeding the maximum allowed length", async () => {
    const token = jwt.sign({ _id: "66265000065976d80747f287" }, process.env.TOKEN_SECRET);

    const res = await request(server)
      .post("/api/notes/upload")
      .set("Cookie", `auth-token=${token}`)
      .send({
        title: "a".repeat(51), // 50 characters is the max allowed length for title
        content: "b".repeat(501), // 500 characters exceeds the maximum allowed length for content
        board: "66265000065976d80747f287", // A valid board ID
      });

    // Expect a 400 status code for validation error
    expect(res.statusCode).toEqual(400);
    // Expect the error message to be sent in the response
    expect(res.body).toEqual({
      error:
        "Title or content length exceeds the maximum allowed length",
    });
  });
});

// close the server afterward
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
