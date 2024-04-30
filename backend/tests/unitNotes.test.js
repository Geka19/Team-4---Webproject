const {
  getNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteControllers");
const Note = require("../models/noteSchema");

jest.mock("../models/noteSchema");

describe("Unit test for the note controller", () => {
  it("should return a note successfully", async () => {
    // Mock request parameters
    const req = { params: { _id: "noteId" } };

    // Mock Note.findOne function. In the actual api it
    // will find a note with the given _id from MongoDB and return it
    const mockNote = {
      _id: "noteId",
      title: "Note Title",
      content: "Note Content",
    };
    Note.findOne.mockResolvedValue(mockNote);

    // Mock response object
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call the function
    await getNote(req, res);

    // Assertions
    expect(Note.findOne).toHaveBeenCalledWith({ _id: "noteId" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNote);
  });

  it("should delete a note successfully", async () => {
    // Mock request parameters
    const req = { params: { _id: "noteId" } };

    // Mock Note.deleteOne function
    Note.deleteOne.mockResolvedValue({ n: 1 });

    // Mock response object
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call the function
    await deleteNote(req, res);

    // Assertions
    expect(Note.deleteOne).toHaveBeenCalledWith({ _id: "noteId" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Note deleted" });
  });

  it("should handle the case when the note does not exist", async () => {
    // Mock request parameters
    const req = { params: { _id: "nonExistingNoteId" } };

    // Mock Note.deleteOne function
    Note.deleteOne.mockResolvedValue({ deletedCount: 0 });

    // Mock response object
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Call the function
    await deleteNote(req, res);

    // Assertions
    expect(Note.deleteOne).toHaveBeenCalledWith({ _id: "nonExistingNoteId" });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Note not found" });
  });

  it("should update a note successfully", async () => {
    const updatedNote = {
      _id: "noteId",
      title: "Updated Note Title",
      content: "Updated Note Content",
    };

    // Mock the updateNote function
    const updateNote = jest.fn().mockResolvedValue({
      status: 200,
      data: { message: "Note updated successfully", note: updatedNote },
    });

    const res = await updateNote(updatedNote);

    expect(updateNote).toHaveBeenCalledWith(updatedNote);
    expect(res).toEqual({
      status: 200,
      data: { message: "Note updated successfully", note: updatedNote },
    });
  });
});
