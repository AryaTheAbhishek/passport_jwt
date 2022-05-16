const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

exports.loginUser = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email });
    const match = bcrypt.compare(req.body.password, result.password);
    if (match) {
      const private_key = process.env.PRIVATEKEY;
      const params = {
        name: result.name,
        email: result.email,
      };
      const token = await jwt.sign(params, private_key, { expiresIn: "1h" });
      res.status(200).json({ message: "token", token: token });
    }
  } catch (error) {
    console.log(error);
  }
};
