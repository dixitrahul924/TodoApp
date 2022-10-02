const User = require("../Model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../lib/logger");

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && first_name && last_name && password)) {
      res.status(400).send("All Inputs Required");
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    logger.error(err);

    res.status(500).send(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
