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


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(methodOverride("_method"));

const userRoutes = require("./routes/userRoutes");


app.use("/user", userRoutes);

//PASSPORT CoNFIG
// app.use(require("express-session")({
//     secret: SECRET_KEY,
//     resave: false,
//     saveUninitialized: false, 
//     expires: new Date(Date.now() + (30 * 86400 * 1000))
// }));

// passport.use("local", new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// passport.use("admin-local", new LocalStrategy(Admin.authenticate()));
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// })


app.get("/", (req,res)=>{
    res.render("index")
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, process.env.IP, ()=>{
    console.log(`Listening on ${PORT}`)
})