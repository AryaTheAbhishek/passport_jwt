const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Load User model
const User = require("../db/models/User");

module.exports = function (passport) {
  let params = {};
  params.secretOrKey = process.env.PRIVATEKEY;
  params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  passport.use(
    new JwtStrategy(params, (jwt_payload, next) => {
      User.findOne({ email: jwt_payload.email }, (err, user) => {
        if (err) {
          console.log(err);
          return next(err, false);
        }
        if (user) {
          next(null, user);
        } else {
          return next(null, false);
        }
      });
    })
  );
};
