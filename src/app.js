const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const request = require("request");
const db = require('./database/db');
const nodemailer = require('nodemailer');
const google = require('googleapis');


import {initRoutes} from "./routes/userRoutes"
import path from 'path';
import {SECRET_KEY} from "./config/constants"


const User = require("./models/user")
const Service = require("./models/service")


app.set('views', path.join(__dirname, 'views')) // Redirect to the views directory inside the src directory
app.use(express.static(path.join(__dirname, '../public'))); // load local css and js files
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride("_method"));

// PASSPORT CoNFIG
app.use(require("express-session")({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false, 
    expires: new Date(Date.now() + (30 * 86400 * 1000))
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use("local", new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);


app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
})


String.prototype.startsWith = function(needle)
{
  return(this.indexOf(needle) == 0)
}

app.use(function(req, res, next) {
  if ( !(req.path == '/login' || req.path.startsWith('/auth/')) && req.session.returnTo) {
    delete req.session.returnTo
  }
  next()
})


initRoutes(app)

const PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, ()=>{
    console.log(`Listening on ${PORT}`)
})