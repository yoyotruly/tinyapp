const bcrypt = require('bcryptjs');
const { users, urlDatabase } = require("./constants");

/**
 * Generate a string of random letter and number combination.
 * @returns {string} 6 charactor random string
 */
const getRandomString = () => {
  return Math.random().toString(36).slice(2, 8);
};

/**
 * Check if the input email has already been registered.
 * @param {string} email Email
 * @param {Object} [userDb=users] Database object storing all user info
 * @returns {boolean} Returns true if email already exists, otherwise returns false
 */
const isExistingEmail = (email, userDb = users) => {
  return Object.values(userDb)
    .map(user => user.email)
    .includes(email);
};

/**
 * Check if a user is authorized to check or perform actions on certain urls.
 * @param {string} userId The ID user logged in as
 * @param {string} value The value to look up
 * @param {string} [lookupBy=shortURL] Which property to look up by
 * @param {Object} [urlDb=urlDatabase] Database object storing all URL related info
 * @returns {boolean} Returns true if current user matches record, returns false
 * otherwise
 */
const isUserAuthorized = (userId, value, lookupBy = "shortURL", urlDb = urlDatabase) => {
  let recordUserId;
  
  // Using switch to account for future scenarios when lookup key is not only shortURL
  switch (lookupBy) {
  case "shortURL":
    recordUserId = urlDb[value] && urlDb[value].userId;
  }

  return userId === recordUserId;
};

/**
 * Get user's info by email and password.
 * @param {string} email Email
 * @param {string} password Password
 * @param {Object} [userDb=users] Database object storing all user info
 * @returns {?Object} Returns user object if email and password match user's
 * record, otherwise returns undefined
 */
const getUserByLogin = (email, password, userDb = users) => {
  if (!email || !password) return undefined;

  return Object.values(userDb)
    .find((user) => {
      return user.email === email && bcrypt.compareSync(password, user.password);
    });
};

/**
 * Check if a user is valid with provided user id, return the user object if it
 * is valid.
 * @param {string} id User ID
 * @param {Object} [userDb=users] Database object storing all user info
 * @returns {?Object} Returns user object if id matches records, returns undefined
 * if id doesn't exist or doesn't match records
 */
const getUserById = (id, userDb = users) => {
  return id && userDb[id];
};

/**
 * get original long URL by shortened URL.
 * @param {string} shortURL Shortened URL
 * @param {Object} [urlDb=urlDatabase] Database object storing all url info
 * @returns {?Object} Returns URL object if shortURL matches records, otherwise
 * returns undefined
 */
const getUrlByShortUrl = (shortURL, urlDb = urlDatabase) => {
  return urlDb[shortURL];
};

/**
 * Filter url database and return only urls created by userId.
 * @param {string} userId User Id
 * @param {Object} [urlDb=urlDatabase] Database object storing all url info
 * @returns {Array} Returns an array or urls object, e.g.
 * [
 *   { shortURL: 'a1b2', longURL: 'https://www.google.com' },
 *   { shortURL: 'c3d4', longURL: 'https://www.youtube.com/' },
 * ]
 */
const getUrlsByUserId = (userId, urlDb = urlDatabase) => {
  return Object.entries(urlDb)
    .filter(url => url[1].userId === userId)
    .map(url => ({
      "shortURL": url[0],
      "longURL": url[1].longURL
    }));
};

/** Add new url record to database.
 * @param {string} userId Current user's ID
 * @param {string} longURL Original URL
 * @param {Object} [urlDb=urlDatabase] Database object containing all url info
 * @returns {string} Returns the short URL system assigned to the original URL
 */
const addNewUrlToDb = (userId, longURL, urlDb = urlDatabase) => {
  const shortURL = getRandomString();
  urlDb[shortURL] = {
    longURL,
    userId,
    analytics: {
      totalClicks: 0,
      uniqueVistors: 0
    }
  };

  return shortURL;
};

/**
 * Modify original URL in database.
 * @param {string} shortURL Short URL for this record
 * @param {string} updatedLongURL New long URL user provided
 * @param {Object} [urlDb=urlDatabase] Database object storing all url info
 * @returns None
 */
const updateLongUrl = (shortURL, updatedLongURL, urlDb = urlDatabase) => {
  urlDb[shortURL].longURL = updatedLongURL;
};

/** Delete URL record.
 * @param {string} shortURL Short URL
 * @param {Object} [urlDb=urlDatabase] Database object storing all url info
 * @returns None
 */
const deleteUrl = (shortURL, urlDb = urlDatabase) => {
  delete urlDb[shortURL];
};

/**
 * (Internal helper function) Hash password with bcrypt algorithm.
 * @param {string} password Password
 * @returns {string} Returns hashed password
 */
const _hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Add new user to database and returns user ID.
 * @param {string} email Email user provided during registration
 * @param {string} password Password user provided during registration
 * @param {Object} [userDb=users] Database object storing all user info
 * @returns {string} Returns user ID
 */
const addNewUserToDb = (email, password, userDb = users) => {
  const id = `u${Object.keys(userDb).length + 1}`;
  const hashedPassword = _hashPassword(password);
  
  userDb[id] = {
    id,
    email,
    hashedPassword
  };

  return id;
};

/**
 * Increment the total click of a given short URL by one.
 * @param {string} shortURL Short URL
 * @param {Object} [urlDb=urlDatabase] Database object containing all url info
 */
const incrementUrlTotalClicks = (shortURL, urlDb = urlDatabase) => {
  urlDb[shortURL].analytics.totalClicks += 1;
};

module.exports = {
  getRandomString,
  isExistingEmail,
  isUserAuthorized,
  getUserByLogin,
  getUserById,
  getUrlByShortUrl,
  getUrlsByUserId,
  addNewUrlToDb,
  updateLongUrl,
  deleteUrl,
  addNewUserToDb,
  incrementUrlTotalClicks
};