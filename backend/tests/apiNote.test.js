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
        Title: "Welcome Message",
        User: "John Doe",
        Tags: ["welcome", "greeting"],
        Content: "Welcome to our platform! We're excited to have you join us.",
        Board: "General",
        Visibility: "public",
      });
    expect(res.statusCode).toEqual(200);
    // Save the note id for the next tests
    noteId = res.body._id;
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

  // close the server afterward
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});
