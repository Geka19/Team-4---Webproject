// utils.js

// Function to validate password
function validatePassword(password) {
  // Check if password is at least 3 characters long
  if (password.length < 3) {
    return false;
  }
  // You can add additional validation logic here if needed
  return true;
}

// Function to check for duplicate email
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

// Information about notes
const notes = [
  {
    _id: "1",
    title: "Note 1",
    user: "user1",
    tags: ["tag1", "tag2"],
    content: "Content of Note 1",
    board: "Drafts",
    visibility: "private",
    date: "2024-04-29T12:00:00Z",
  },
  {
    _id: "2",
    title: "Note 2",
    user: "user2",
    tags: ["tag3", "tag4"],
    content: "Content of Note 2",
    board: "Drafts",
    visibility: "public",
    date: "2024-04-30T12:00:00Z",
  },
];

module.exports = {
  validatePassword,
  checkForDuplicateEmail,
  notes,
};
