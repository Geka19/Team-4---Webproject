const request = require("supertest");
const server = require("../server");
const mongoose = require("mongoose");

describe("Note API", () => {
  it("should fail to create a note with title and content length exceeding the maximum allowed length", async () => {
    const res = await request(server)
      .post("/api/notes")
      .send({
        title: "a".repeat(51), // 50 characters is the max allowed length for title
        content: "b".repeat(501), // 500 characters exceeds the maximum allowed length for content
      });

    // Expect a 500 status code for validation error
    expect(res.statusCode).toEqual(500);
    // Expect the error message to be sent in the response
    expect(res.body).toEqual({
      error:
        "Error creating card: Note validation failed: title: Title is too long., content: Content is too long.",
    });
  });

  // close the server afterward
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});
