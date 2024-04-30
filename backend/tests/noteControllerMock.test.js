const request = require("supertest");
const server = require("../server");
const Note = require("../models/noteSchema");
const mongoose = require("mongoose");

describe("Note API", () => {
  let noteId;

  beforeEach(async () => {
    // Spy on the create method of the Note model
    jest.spyOn(Note, "create").mockResolvedValueOnce({
      _id: "123",
      title: "Test Note",
      user: "Test User",
      tags: ["tag1", "tag2"],
      content: "Test Content",
      board: "Test Board",
      visibility: "public",
    });

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
    expect(res.statusCode).toEqual(200);
    // Save the note id for the next tests
    noteId = "123";
  });

  it("should get all notes", async () => {
    // Mocking find method of Note model
    jest.spyOn(Note, "find").mockResolvedValueOnce([
      {
        _id: "123",
        title: "Test Note",
        user: "Test User",
        tags: ["tag1", "tag2"],
        content: "Test Content",
        board: "Test Board",
        visibility: "public",
      },
    ]);

    const res = await request(server).get("/api/notes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should get a specific note", async () => {
    // Mocking findOne method of Note model
    jest.spyOn(Note, "findOne").mockResolvedValueOnce({
      _id: "123",
      title: "Test Note",
      user: "Test User",
      tags: ["tag1", "tag2"],
      content: "Test Content",
      board: "Test Board",
      visibility: "public",
    });

    const res = await request(server).get(`/api/notes/${noteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", "123");
  });

  it("should update a note", async () => {
    // Mocking findByIdAndUpdate method of Note model
    jest.spyOn(Note, "findByIdAndUpdate").mockResolvedValueOnce({
      _id: "123",
      title: "Updated Test Note",
      user: "Test User",
      tags: ["tag1", "tag2"],
      content: "Updated Test Content",
      board: "Test Board",
      visibility: "public",
    });

    const res = await request(server).put(`/api/notes/${noteId}`).send({
      title: "Updated Test Note",
      content: "Updated Test Content",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Test Note");
  });

  // close the server afterward
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
});
