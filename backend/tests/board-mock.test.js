const boardController = require("../controllers/boardController");
const Board = require("../models/boardSchema");

jest.mock("../models/boardSchema");

describe("Board Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBoards", () => {
    it("should return all boards", async () => {
      const mockBoards = [{ title: "Board 1", description: "Description 1" }];
      Board.find.mockResolvedValue(mockBoards);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res), // Add this line
      };

      await boardController.getAllBoards(req, res);

      expect(res.json).toHaveBeenCalledWith(mockBoards);
    });

    it("should handle errors", async () => {
      const errorMessage = "Internal server error";
      Board.find.mockRejectedValue(new Error(errorMessage));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await boardController.getAllBoards(req, res);
    });
  });
});
