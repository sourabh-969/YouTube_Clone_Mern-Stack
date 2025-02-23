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
    const l_channel = await Channel.findOne({
      $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
    });

    if (!l_channel) return res.status(404).json("Channel not found!");

    const l_passwordCheck = await bcrypt.compare(
      req.body.password,
      l_channel.password
    );

    if (!l_passwordCheck)
      return res.status(400).json("Wrong password or channel name!");

    const accessToken = jwt.sign(
      { id: l_channel._id },
      process.env.SECRET_JWT,
      { expiresIn: "1d" }
    );

    res
      .cookie("accessToken", accessToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // expires in 1 day(Cookie:nodejs middleware for accessing http req.)
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        id: l_channel._id,
        name: l_channel.name,
        profile: l_channel.profile,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
