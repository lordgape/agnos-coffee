const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const user = require('../models/User');
const key = require('./keys');

const opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.jwtKey;

module.exports = passport => {

  passport.use(new JWTStrategy(opts, (jwtPayload, done) => {

    user.findById(jwtPayload.id)
        .then((user) => 
        {
            if(user)
            {
              return done(null,user);
            }
            else {
              return done(null,false);
            }
          
        })
        .catch((error) => console.log(JSON.stringify(error)))

    
  }));
}