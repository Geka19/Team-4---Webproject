const request = require("supertest");
const server = require("../server");
const Note = require("../models/noteSchema");
const mongoose = require("mongoose");

describe("Note API", () => {
  let noteId;

  beforeEach(async () => {
    const res = await request(server)
      .post("/api/notes")
      .send({
        title: "Test Note",
        user: "Test User",
        tags: ["tag1", "tag2"],
        content: "Test Content",
        board: "Test Board",
        visibility: "public",
      });
    expect(res.statusCode).toEqual(201);
    // Save the note id for the next tests
    noteId = res.body.note._id;
  });

  it("should get all notes", async () => {
    const res = await request(server).get("/api/notes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get a specific note", async () => {
    const res = await request(server).get(`/api/notes/${noteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", noteId);
  });

  it("should update a note", async () => {
    const res = await request(server).put(`/api/notes/${noteId}`).send({
      title: "Updated Test Note",
      content: "Updated Test Content",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Test Note");
  });

  it("should delete a note", async () => {
    const res = await request(server).delete(`/api/notes/${noteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Note deleted");
  });

  it("should fail to create a note with title and content length exceeding the maximum allowed length", async () => {
    const res = await request(server)
      .post("/api/notes")
      .send({
        title: "a".repeat(51), // 50 characters is the max allowed length for title
        content: "b".repeat(501), // 500 characters exceeds the maximum allowed length for content
      });

    // Assertions
    // Expect a 400 status code for validation error
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
