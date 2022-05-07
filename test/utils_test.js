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
  "ty5W3Q": {
    longURL: "https://www.google.ca",
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

/* ------ getRandomString Tests ------ */
describe("getRandomString()", () => {
  // utils.getRandomString();
});

/* ------ isExstingEmail Tests ------ */
describe("isExistingEmail(email, userDb)", () => {
  // utils.isExistingEmail();
});

describe("isUserAuthorized(userId, value, lookupBy, userDb)", () => {
  // utils.isUserAuthorized;
});

/* ------ getUserByLogin Tests ------ */
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

/* ------ getUserById Tests ------ */
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

/* ------ getUrlByShortUrl Tests ------ */
describe("getUrlByShortUrl(shortURL, urlDb)", () => {
  it("should return an URL object with a valid shortURL", () => {
    const url = utils.getUrlByShortUrl("b2xVn2", testUrls);
    const expectedOutput = testUrls["b2xVn2"];
    expect(url).to.eql(expectedOutput);
  });

  it("should return undefined with an invalid shortURL", () => {
    const url = utils.getUrlByShortUrl("asdfg", testUrls);
    expect(url).to.equal(undefined);
  });

  it("should return undefined with an empty shortURL", () => {
    const url = utils.getUrlByShortUrl("", testUrls);
    expect(url).to.equal(undefined);
  });

  it("should return undefined with a shortURL being undefined", () => {
    const url = utils.getUrlByShortUrl(undefined, testUrls);
    expect(url).to.equal(undefined);
  });
});

/* ------ getUrlsByUserId Tests ------ */
describe("getUrlsByUserId(userId, urlDb)", () => {
  it("should return an array containing all shortURLs and longURLs associated with a valid userId", () => {
    const urls = utils.getUrlsByUserId("userRandomID", testUrls);
    const expectedOutput = [
      {
        shortURL: "b2xVn2",
        longURL: "https://www.lighthouselabs.ca"
      },
      {
        shortURL: "ty5W3Q",
        longURL: "https://www.google.ca"
      }
    ];
    expect(urls).to.eql(expectedOutput);
  });

  it("should return an empty array with an invalid userId", () => {
    const url = utils.getUrlsByUserId("fakeID", testUrls);
    expect(url).to.eql([]);
  });

  it("should return an empty array with an empty userId", () => {
    const url = utils.getUrlsByUserId("", testUrls);
    expect(url).to.eql([]);
  });

  it("should return an empty array with userId being undefined", () => {
    const url = utils.getUrlsByUserId(undefined, testUrls);
    expect(url).to.eql([]);
  });
});

/* ------ addNewUrlToDb Tests ------ */
describe("addNewUrlToDb(userId, longURL, urlDb)", () => {
  // utils.addNewUrlToDb();

});

/* ------ updateLongUrl Tests ------ */
describe("updateLongUrl(shortURL, updatedLongURL, urlDb)", () => {
  // utils.updateLongUrl();
});

/* ------ deleteUrl Tests ------ */
describe("deleteUrl(shortURL, urlDb)", () => {
  // utils.deleteUrl();
});

/* ------ addNewUserToDb Tests ------ */
describe("addNewUserToDb(email, password, userDb)", () => {
  // utils.addNewUserToDb();
});