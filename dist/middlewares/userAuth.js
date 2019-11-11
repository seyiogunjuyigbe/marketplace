"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;

var User = require("../models/user");

var passport = require("passport"); // Sign Up


var registerUser = function registerUser(req, res) {
  var thisUser = new User(req.body.user);
  thisUser.username = req.body.username;
  User.register(thisUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send("Server Error");
    }

    passport.authenticate("local")(req, res, function () {
      console.log("User registered");
      return res.status(200).render("dashboard", {
        user: user
      });
    });
  });
}; //Login


exports.registerUser = registerUser;
var loginUser = passport.authenticate("local", {
  successRedirect: '/user/profile',
  failureRedirect: "/user/login"
}); //logout Middleware

exports.loginUser = loginUser;

var logoutUser = function logoutUser(req, res) {
  req.logout();
  console.log("Logged Out");
  res.redirect("/user/login");
}; // Check if user is logged in


exports.logoutUser = logoutUser;

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/user/login");
};

exports.isLoggedIn = isLoggedIn;