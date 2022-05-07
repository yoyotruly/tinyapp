const utils = require("../utils/utils");

describe("getRandomString()", () => {
  utils.getRandomString();
});

describe("isExistingEmail(email, userDb)", () => {
  utils.isExistingEmail();
});

describe("isUserAuthorized(userId, value, lookupBy, userDb)", () => {
  utils.isUserAuthorized();
});

describe("getUserByLogin(email, password, userDb)", () => {
  utils.getUserByLogin();
});

describe("getUserById(id, userDb)", () => {
  utils.getUserById();
});

describe("getLongUrlByShortUrl(shortURL, urlDb)", () => {
  utils.getLongUrlByShortUrl();
});

describe("getUrlsByUserId(userId, urlDb)", () => {
  utils.getUrlsByUserId();
});

describe("addNewUrlToDb(userId, longURL, urlDb)", () => {
  utils.addNewUrlToDb();

});

describe("updateLongUrl(shortURL, updatedLongURL, urlDb)", () => {
  utils.updateLongUrl();
});

describe("deleteUrl(shortURL, urlDb)", () => {
  utils.deleteUrl();
});

describe("addNewUserToDb(email, password, userDb)", () => {
  utils.addNewUserToDb();
});