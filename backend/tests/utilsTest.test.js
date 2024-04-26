// Import the validatePassword function
const { validatePassword } = require("./utils");

describe("validatePassword function", () => {
  // Test case for passwords shorter than 3 characters
  it("should return false for passwords shorter than 3 characters", () => {
    // Call validatePassword with a password shorter than 3 characters
    const result = validatePassword("ab");

    // Expect the result to be false
    expect(result).toBe(false);
  });
});
