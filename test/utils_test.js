const utils = require("../utils/utils");

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe("getRandomString()", () => {
  // utils.getRandomString();
});

describe("isExistingEmail(email, userDb)", () => {
  // utils.isExistingEmail();
});

describe("isUserAuthorized(userId, value, lookupBy, userDb)", () => {
  // utils.isUserAuthorized();
});

describe("getUserByLogin(email, password, userDb)", () => {
  // utils.getUserByLogin();
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