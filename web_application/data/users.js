import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';
const saltRounds = 16;

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
) => {
  if (!firstName || !lastName || !emailAddress || !password) {
    throw "Input is not supplied";
  }
  if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof emailAddress !== 'string' || typeof password !== 'string') {
    throw "Input must be string";
  }
  if (firstName.trim().length == 0 || lastName.trim().length == 0 || emailAddress.trim().length == 0 || password.trim().length == 0) {
    throw "Input can't be strings with only empty spaces";
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.trim().toLowerCase();
  password = password.trim();
  const lettersOnlyRegex = /^[a-zA-Z]+$/;
  if (firstName.length < 2 || firstName.length > 35) {
    throw "firstName should be at least 2 characters long with a max of 25";
  }
  if (!lettersOnlyRegex.test(firstName)) {
    throw "First name should not contain numbers or special characters";
  }
  if (lastName.length < 2 || lastName.length > 35) {
    throw "lastName should be at least 2 characters long with a max of 25";
  }
  if (!lettersOnlyRegex.test(lastName)) {
    throw "Last name should not contain numbers or special characters";
  }
  var regExp = /\S+@\S+\.\S+/; // source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  if (!regExp.test(emailAddress)) {
      throw "Invalid email address";
  }
  const userCollection = await users();
  if (!userCollection) {
    throw "Database error";
  }
  const findEmail = await userCollection.findOne({emailAddress: emailAddress});
  if (findEmail) {
    throw "Email address supplied is already in the database";
  }
  if (password.length < 8) {
    throw "Password should have mimunum of 8 characters long";
  }
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]|\\;:"<>,./?])[A-Za-z\d~`!@#$%^&*()-_+={}[\]|\\;:"<>,./?]+$/; // source: chatGPT
  if (!regex.test(password)) {
    throw "There needs to be at least one uppercase character, at least one number and at least one special character";
  }
  const hash = await bcrypt.hash(password, saltRounds);
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hash
  };
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';
  return {insertedUser: true};
};

export const loginUser = async (emailAddress, password) => {
  if (!emailAddress || !password) {
    throw "emailAddress and password must be supplied";
  }
  if (typeof emailAddress != 'string' || typeof password != 'string') {
    throw "Input parameter must be a string";
  }
  if (emailAddress.trim().length == 0 || password.trim().length == 0) {
    throw "Can't have input with just string with spaces";
  }
  emailAddress = emailAddress.trim().toLowerCase();
  password = password.trim();
  var regExp = /\S+@\S+\.\S+/; // source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  if (!regExp.test(emailAddress)) {
      throw "Invalid email address";
  }
  if (password.length < 8) {
    throw "Password should have mimunum of 8 characters long";
  }
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]|\\;:"<>,./?])[A-Za-z\d~`!@#$%^&*()-_+={}[\]|\\;:"<>,./?]+$/; // source: chatGPT
  if (!regex.test(password)) {
    throw "There needs to be at least one uppercase character, at least one number and at least one special character";
  }
  const userCollection = await users();
  const foundUser = await userCollection.findOne({emailAddress: emailAddress});
  if (!foundUser) {
    throw "Either the email address or password is invalid";
  } else {
    let compareResult = await bcrypt.compare(password, foundUser.password);
    if (compareResult) {
      return {firstName: foundUser.firstName, lastName: foundUser.lastName, emailAddress: foundUser.emailAddress, role: foundUser.role};
    } else {
      throw "Either the email address or password is invalid";
    }
  }

};

export default {registerUser, loginUser}