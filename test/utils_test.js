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

const testUrls = {
  "b2xVn2": {
    longURL: "https://www.lighthouselabs.ca",
    userId: "userRandomID",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
  "a1Ea5x": {
    longURL: "https://www.youtube.com/",
    userId: "user2RandomID",
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  },
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
  it("should return a user object with a valid id", () => {
    const user = utils.getUserById("userRandomID", testUsers);
    const expectedOutput = testUsers.userRandomID;
    expect(user).to.eql(expectedOutput);
  });

  it("should return undefined with an invalid id", () => {
    const user = utils.getUserById("fakeID", testUsers);
    expect(user).to.equal(undefined);
  });

  it("should return undefined with an id of undefined", () => {
    const user = utils.getUserById(undefined, testUsers);
    expect(user).to.equal(undefined);
  });

  it("should return undefined with an id of empty string", () => {
    const user = utils.getUserById("", testUsers);
    expect(user).to.equal(undefined);
  });
});

describe("getUrlByShortUrl(shortURL, urlDb)", () => {
  it("should return an URL object with a valid shortURL", () => {
    const url = utils.getUrlByShortUrl("b2xVn2", testUrls);
    const expectedOutput = testUrls["b2xVn2"];
    expect(url).to.eql(expectedOutput);
  });

  it("should return undefined with an invalid shortURL", () => {
    const url = utils.getUrlByShortUrl("asdfg", testUrls);
    expect(url).to.eql(undefined);
  });

  it("should return undefined with an empty shortURL", () => {
    const url = utils.getUrlByShortUrl("", testUrls);
    expect(url).to.eql(undefined);
  });

  it("should return undefined with a shortURL being undefined", () => {
    const url = utils.getUrlByShortUrl(undefined, testUrls);
    expect(url).to.eql(undefined);
  });
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