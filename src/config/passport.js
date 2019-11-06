const passport = require("passport");
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
import {SECRET_KEY} from "./constants"
import {User} from "../models/user"

module.exports = () =>{
    passport.use("local", new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
}

