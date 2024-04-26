// Function to validate password
function validatePassword(password) {
  // Check if password is at least 3 characters long
  if (password.length < 3) {
    return false;
  }
  // You can add additional validation logic here if needed
  return true;
}

function checkForDuplicateEmail(email) {
  // Simulated database of existing email addresses
  const database = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
  ];

  // Check if the email exists in the database
  const isDuplicate = database.includes(email);
  return isDuplicate;
}

module.exports = {
  validatePassword,
  checkForDuplicateEmail,
};
