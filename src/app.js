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
import {initRoutes} from "./routes/userRoutes"
import path from 'path';
import {SECRET_KEY} from "./config/constants"
const User = require("./models/user")

app.set('views', path.join(__dirname, 'views')) // Redirect to the views directory inside the src directory
app.use(express.static(path.join(__dirname, '../public'))); // load local css and js files
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/public'));
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

app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// })

initRoutes(app)
const PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, ()=>{
    console.log(`Listening on ${PORT}`)
})