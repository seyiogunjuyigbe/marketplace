const passport = require('passport');
const User = require ("../models/user");
var FacebookStrategy = require('passport-facebook').Strategy;
import {FACEBOOK_CLIENT_ID,FACEBOOK_CLIENT_SECRET, DOMAIN_NAME} from "../config/constants";

passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: `http://${DOMAIN_NAME}/auth/facebook/callback`,
        profileFields: ["email", "name"]
      },
      function(accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name } = profile._json;
        const userData = {
          email,
          firstName: first_name,
          lastName: last_name
        };
        new User(userData).save();
        done(null, profile);
      }
    )
  );
export const facebookLogin = passport.authenticate("facebook");
  export const facebookCallback = passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: "/profile/dashboard" },
function(req, res) {
    console.log(req)
})