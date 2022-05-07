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
  it("should return a string with a length of 6", () => {
    const randomString = utils.getRandomString();
    expect(randomString).to.be.a("string");
    expect(randomString.length).to.equal(6);
  });

  it("should generate two different strings by calling twice", () => {
    const randomString1 = utils.getRandomString();
    const randomString2 = utils.getRandomString();
    expect(randomString1).to.not.equal(randomString2);
  });
});

/* ------ isExstingEmail Tests ------ */
describe("isExistingEmail(email, userDb)", () => {
  it("should return true when passed an email already exists in database", () => {
    const result = utils.isExistingEmail("user@example.com");
    expect(result).to.be.true;
  });

  it("should return false when passed an email that doesn't exist", () => {
    const result = utils.isExistingEmail("fake@example.com");
    expect(result).to.be.false;
  });

  it("should return false when passed an empty email", () => {
    const result = utils.isExistingEmail("");
    expect(result).to.be.false;
  });
});

/* ------ isUserAuthorized Tests ------ */
describe("isUserAuthorized(userId, value, lookupBy, userDb)", () => {
  it("should return true when passed a shortURL that belongs to the userId", () => {
    const userId = "userRandomID";
    const value = "b2xVn2";
    expect(utils.isUserAuthorized(userId, value, "shortURL", testUrls))
      .to.be.true;
  });

  it("should return true when passed a shortURL that exists but doesn't belong to the userId", () => {
    const userId = "userRandomID";
    const value = "a1Ea5x";
    expect(utils.isUserAuthorized(userId, value, "shortURL", testUrls))
      .to.be.false;
  });

  it("should return true when passed a shortURL that doesn't exist", () => {
    const userId = "userRandomID";
    const value = "fakeid";
    expect(utils.isUserAuthorized(userId, value, "shortURL", testUrls))
      .to.be.false;
  });

  it("should return true when passed an empty shortURL or undefined", () => {
    const userId = "userRandomID";
    expect(utils.isUserAuthorized(userId, "", "shortURL", testUrls))
      .to.be.false;
    expect(utils.isUserAuthorized(userId, undefined, "shortURL", testUrls))
      .to.be.false;
  });
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
  it("should add new url to database", () => {
    const longURL = "https://www.google.com";
    const shortURL = utils.addNewUrlToDb("testId", longURL, testUrls);

    expect(shortURL).to.be.a("string");
    expect(testUrls[shortURL].longURL).to.equal(longURL);
  });
});

/* ------ updateLongUrl Tests ------ */
describe("updateLongUrl(shortURL, updatedLongURL, urlDb)", () => {
  it("should update corresponding longURL and return true when passed a valid shortURL", () => {
    const shortURL = "b2xVn2";
    const updatedLongURL = "https://www.facebook.com";
    expect(utils.updateLongUrl(shortURL, updatedLongURL, testUrls)).to.be.true;
    expect(testUrls[shortURL].longURL).to.equal(updatedLongURL);
  });

  it("should return false when passed an invalid shortURL", () => {
    const shortURL = "fake123";
    const updatedLongURL = "https://www.facebook.com";
    expect(utils.updateLongUrl(shortURL, updatedLongURL, testUrls)).to.be.false;
    expect(testUrls[shortURL]).to.equal(undefined);
  });

  it("should return false when passed an empty shortURL", () => {
    const shortURL = "";
    const updatedLongURL = "https://www.facebook.com";
    expect(utils.updateLongUrl(shortURL, updatedLongURL, testUrls)).to.be.false;
    expect(testUrls[shortURL]).to.equal(undefined);
  });
});

/* ------ deleteUrl Tests ------ */
describe("deleteUrl(shortURL, urlDb)", () => {
  it("should delete the url when passed a valid short url", () => {
    const shortURL = "a1Ea5x";
    utils.deleteUrl(shortURL, testUrls);
    expect(testUrls[shortURL]).to.equal(undefined);
  });
});

/* ------ addNewUserToDb Tests ------ */
describe("addNewUserToDb(email, password, userDb)", () => {
  it("should add new user to database when passed valid email and password", () => {
    const email = "test@test.com";
    const password = "test";
    const userId = utils.addNewUserToDb(email, password, testUsers);

    expect(userId).to.be.a("string");
    expect(testUsers[userId]).to.be.instanceOf(Object);
  });
});