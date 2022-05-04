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
 * record, returns false otherwise
 */
const findUser = (email, password) => {
  if (!email || !password) return false;
  
  const user = Object.values(users)
    .find((user) => (user.email === email && user.password === password));

  if (!user) return false;

  return user;
};

module.exports = {
  generateRandomString,
  checkEmailExist,
  findUser
};