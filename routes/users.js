const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../config/verify_passport_jwt")(passport);

const Register = require("../controllers/register");
const Login = require("../controllers/login");
const Profile = require("../controllers/profile");

// Register
router.post("/register", Register.registerUser);

// Jwt Login
router.post("/jwt_login", Login.loginUser);

//Passport Jwt Verify
router.post(
  "/get_profile",
  passport.authenticate("jwt", { session: false }),
  Profile.getProfile
);

module.exports = router;
