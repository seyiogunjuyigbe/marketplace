
const passport = require('passport');
const User = require ("../models/user");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET, DOMAIN_NAME} from "../config/constants";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${DOMAIN_NAME}/auth/google/callback`
  },
  (accessToken,
    refreshToken,
    profile,
    done) => {
    User.findOne({googleID: profile.id})
        .then(currentUser => {
                if(!currentUser) {
                let newUser = {
                    username: profile.displayName,
                    googleID: profile.id,
                    name: {
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName
                    }
                };
                new User(newUser)
                    .save()
                    .then((res) => {
                        console.log(`New user created: ${res}`);
                        done(null, currentUser)
                    })
                    .catch((err) => {
                        console.log(`Error while creating new user: ${err}`);
                        done(true, currentUser)
                    })
            }
            else{
                console.log(`User loged in: ${currentUser}`);
                done(null, currentUser)
            }
        })
}));

export const googleLogin = 
    passport.authenticate('google', { scope: ['profile', 'email'] });


export const googleCallback = 
    passport.authenticate('google', { failureRedirect: '/login', successReturnToOrRedirect: "/profile/dashboard" },
    function(req, res) {
    })
