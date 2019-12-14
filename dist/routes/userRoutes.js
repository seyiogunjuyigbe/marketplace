"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRoutes = void 0;

var _middlewares = require("../middlewares/middlewares");

var _login = require("../helpers/login");

var _services = require("../middlewares/services");

var _myProfile = require("../middlewares/myProfile");

var _getServices = require("../middlewares/getServices");

var _payment = require("../middlewares/payment");

var initRoutes = function initRoutes(app) {
  app.get("/", _middlewares.isLoggedIn, function (req, res) {
    return res.render("index");
  });
  app.get("/user/register", function (req, res) {
    return res.render("register");
  });
  app.get("/user/login", function (req, res) {
    return res.render("login");
  });
  app.get("/user/profile", _myProfile.myProfile);
  app.get("/user/dashboard", _middlewares.isLoggedIn, function (req, res) {
    return res.render("dashboard");
  });
  app.get("/user/:id/services/new", _middlewares.isLoggedIn, _services.renderServicePage);
  app.get("/user/:id/services/all", _middlewares.isLoggedIn, _services.seeMyServices);
  app.get("/services/all", _getServices.getAllServices);
  app.get("/services/:id", _getServices.getThisService);
  app.get("/user/:id/services/:service_id/edit", _middlewares.isLoggedIn, _services.editService);
  app.get("/user/:id/services/:service_id/delete", _middlewares.isLoggedIn, _services.deleteService); // app.get("/user/login/success", (req,res)=>res.send(`${req.user} Logged in successfully!`))

  app.post("/user/register", _middlewares.registerUser);
  app.post("/user/login", _middlewares.loginUser, _login.logHelp);
  app.get("/user/logout", _middlewares.logoutUser);
  app.post("/user/new", _middlewares.newUser);
  app.get("/user/:id/services/:service_id/pay", _middlewares.isLoggedIn, _payment.payNow); // success page 

  app.get('/success', function (req, res) {
    console.log(req.query);
    res.send("Success!");
  }); // error page 

  app.get('/err', function (req, res) {
    console.log(req.query);
    res.send('Failed!');
  }); // Update User details

  app.put("/user/:id", _middlewares.editUser); // Create Service

  app.post("/user/:id/services/new", _middlewares.isLoggedIn, _services.createService); // app.all("*", (req,res)=>{res.send("Error... resource not found")})
};

exports.initRoutes = initRoutes;