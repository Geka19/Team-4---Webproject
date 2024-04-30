const {
  getNote,
  deleteNote,
} = require("../controllers/noteControllers");
const Note = require("../models/noteSchema");

jest.mock("../models/noteSchema");

describe("Unit tests for the note controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve a note successfully", async () => {
    const req = { params: { _id: "noteId" } };
    const mockNote = {
      _id: "noteId",
      title: "Note Title",
      content: "Note Content",
    };
    Note.findOne.mockResolvedValue(mockNote);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getNote(req, res);

    expect(Note.findOne).toHaveBeenCalledWith({ _id: "noteId" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNote);
  });

  it("should delete a note successfully", async () => {
    const req = { params: { _id: "noteId" } };
    Note.deleteOne.mockResolvedValue({ n: 1 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteNote(req, res);

    expect(Note.deleteOne).toHaveBeenCalledWith({ _id: "noteId" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Note deleted" });
  });

  it("should handle the case when the note does not exist", async () => {
    const req = { params: { _id: "nonExistingNoteId" } };
    Note.deleteOne.mockResolvedValue({ deletedCount: 0 });
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteNote(req, res);

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
