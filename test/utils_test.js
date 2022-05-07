const { expect } = require("chai");
const utils = require("../utils/utils");

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "$2a$10$fVkM8H6Pg93GuctBKz/GgOduNV86yB2WVXpZgD9fsdiu20amQmOkq" // hashed from purple-monkey-dinosaur
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "$2a$10$Q5vF64y83RTKBjIwMuiykexzOzHyP4QaHQ3ZnCwqYPwzH78Z19xnC" // hashed from dishwasher-funk
  }
};

describe("getRandomString()", () => {
  // utils.getRandomString();
});

describe("isExistingEmail(email, userDb)", () => {
  // utils.isExistingEmail();
});

describe("isUserAuthorized(userId, value, lookupBy, userDb)", () => {
  // utils.isUserAuthorized;
});

describe("getUserByLogin(email, password, userDb)", () => {
  it("should return a user object with valid email and password", () => {
    const user = utils.getUserByLogin(
      "user@example.com",
      "purple-monkey-dinosaur",
      testUsers
    );
    const expectedOutput = testUsers.userRandomID;

    expect(user).to.eql(expectedOutput);
  });

  it("should return undefined with an invalid email", () => {
    const user = utils.getUserByLogin(
      "fakeemail@example.com",
      "purple-monkey-dinosaur",
      testUsers
    );

    expect(user).to.equal(undefined);
  });

  it("should return undefined with an invalid password", () => {
    const user = utils.getUserByLogin(
      "user@example.com",
      "purple-monkey",
      testUsers
    );

    expect(user).to.equal(undefined);
  });

  it("should return undefined with an empty email or password", () => {
    const user1 = utils.getUserByLogin(
      "",
      "purple-monkey-dinosaur",
      testUsers
    );

    const user2 = utils.getUserByLogin(
      "user@example.com",
      "",
      testUsers
    );

    expect(user1).to.equal(undefined);
    expect(user2).to.equal(undefined);
  });
});

describe("getUserById(id, userDb)", () => {
  // utils.getUserById();
});

describe("getUrlByShortUrl(shortURL, urlDb)", () => {
  // utils.getUrlByShortUrl();
});

describe("getUrlsByUserId(userId, urlDb)", () => {
  // utils.getUrlsByUserId();
});

describe("addNewUrlToDb(userId, longURL, urlDb)", () => {
  // utils.addNewUrlToDb();

});

describe("updateLongUrl(shortURL, updatedLongURL, urlDb)", () => {
  // utils.updateLongUrl();
});

describe("deleteUrl(shortURL, urlDb)", () => {
  // utils.deleteUrl();
});

describe("addNewUserToDb(email, password, userDb)", () => {
  // utils.addNewUserToDb();
});