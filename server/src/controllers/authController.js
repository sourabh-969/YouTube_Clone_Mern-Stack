const Channel = require("../models/Channel");
const bcrypt = require("bcryptjs");   //use for hashing 
const jwt = require("jsonwebtoken");

// Controller for User.Auth.......
const register = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    const l_channel = new Channel({ ...req.body, password: hashPassword });
    await l_channel.save();

    res.status(200).send("Channel has been created!");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const nameOrEmail = req.body.name;
  try {
    // Find the channel by email or name
    const l_channel = await Channel.findOne({
      $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
    });

    if (!l_channel) {
      return res.status(404).json({ error: "Channel not found!" });
    }

    // hashed password
    const l_passwordCheck = await bcrypt.compare(
      req.body.password,
      l_channel.password
    );

    if (!l_passwordCheck) {
      return res.status(400).json({ error: "Wrong password or channel name!" });
    }

    // Generate token
    const accessToken = jwt.sign({ id: l_channel._id }, process.env.SECRET_JWT, {
      expiresIn: "1d",
    });

    // Set the token as a cookie
    res
      .cookie("accessToken", accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict",
        domain: "localhost",
        path: "/", // Set the cookie path
      })
      .status(200)
      .json({
        id: l_channel._id,
        name: l_channel.name,
        profile: l_channel.profile,
      });
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
};
module.exports = { login, register };
