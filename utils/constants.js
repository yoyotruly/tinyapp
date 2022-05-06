const urlDatabase = {
  "b2xVn2": {
    longURL: "https://www.lighthouselabs.ca",
    userId: "u1"
  },
  "a1Ea5x": {
    longURL: "https://www.youtube.com/",
    userId: "u1"
  },
  "ty5W3Q": {
    longURL: "https://www.facebook.com",
    userId: "u1"
  },
  "9aiU7q": {
    longURL: "https://www.airbnb.ca/",
    userId: "u2"
  },
  "9sm5xK": {
    longURL: "https://www.google.com",
    userId: "u2"
  },
};

const users = {
  u1: {
    id: "u1",
    email: "user@example.com",
    password: "$2a$10$fVkM8H6Pg93GuctBKz/GgOduNV86yB2WVXpZgD9fsdiu20amQmOkq" // purple-monkey-dinosaur
  },
  u2: {
    id: "u2",
    email: "user2@example.com",
    password: "$2a$10$Q5vF64y83RTKBjIwMuiykexzOzHyP4QaHQ3ZnCwqYPwzH78Z19xnC" // dishwasher-funk
  }
};

module.exports = {
  urlDatabase,
  users
};