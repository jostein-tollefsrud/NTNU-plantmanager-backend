require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRIVATE_KEY
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {

        console.log(jwt_payload);
        
        User.findOne({_id: jwt_payload.id}, (err, user) => {
            
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        });
        
    }));
}