const { users } = require("./constants");

const generateRandomString = () => {
  return "x2Az3";
};

const checkEmailExist = (email) => {
  const emailRecords = Object.values(users).map(x => x.email);

  return emailRecords.includes(email);
};

/**
 * Check if a user is valid with provided email and password, return the user
 * object if it is valid.
 * @param {string} email Email
 * @param {string} password Password
 * @returns {*} Returns user object if input email and password match user's
 * record, otherwise returns undefined
 */
const findUserByLogin = (email, password) => {
  if (!email || !password) return undefined;
  
  return Object.values(users)
    .find((user) => (user.email === email && user.password === password));
};

/**
 * Check if a user is valid with provided user id, return the user object if it
 * is valid.
 * @param {string} id User ID
 * @returns {*} Returns user object if id matches record, otherwise returns
 * undefine
 */
const findUserById = (id) => {
  if (!id) return false;

  return users[id];
};

module.exports = {
  generateRandomString,
  checkEmailExist,
  findUserByLogin,
  findUserById
};