const bcrypt = require("bcryptjs");
const User = require("../db/models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ Error: "Please enter all fields" });
      return;
    }

    const get_ex_user = await User.findOne({ email: email });
    if (get_ex_user) res.status(400).json({ Error: "Email already exists" });
    else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res
        .status(200)
        .json({ message: "Registered Successfully", user: { name, email } });
    }
  } catch (error) {
    console.log(error);
  }
};
