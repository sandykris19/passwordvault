const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { query } = require("express");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let error = { email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    error.email = "This email id is not registered";
  }

  if (err.message === "incorrect password") {
    error.email = "Your password does not match with email id";
  }

  if (err.code === 11000) {
    error.email = "That email is already taken";
    return error;
  }
  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

//creating jwt and token
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "super secret", { expiresIn: maxAge });
};

module.exports.signup_get = (req, res) => {
  res.render("signup", { emails: null, passwords: null });
};
module.exports.login_get = (req, res) => {
  res.render("login", { message: null, email: null, password: null });
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(`user : ${user._id}`);
    res.render("login", { message: "Registration Success, Please login" });
  } catch (err) {
    const errors = handleErrors(err);
    res.render("signup", { emails: errors.email, passwords: errors.password });
    console.log(errors);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.redirect("/");
  } catch (err) {
    const error = handleErrors(err);
    res.render("login", {
      message: null,
      email: error.email,
      password: error.password,
    });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
