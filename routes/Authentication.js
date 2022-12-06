const { Router } = require("express");
const SignupModel = require("../models/signupModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 5;

let signupRoute = Router();

signupRoute.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;

  let validEmail = await SignupModel.findOne({ email });
  if (validEmail !== null) {
    res.status(406).send({ msg: "email is allready used" });
  } else {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const data = SignupModel({
        username: username,
        email: email,
        password: hash,
      });
      try {
        await data.save();
        res.send({ msg: "signup seccessfully" });
      } catch (err) {
        console.log(err);
      }
    });
  }
});

signupRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await SignupModel.findOne({ email });
  if (user) {
    const hash = user.password;
    let isValid = await bcrypt.compareSync(password, hash);
    if (isValid) {
      let token = jwt.sign({ userId: user._id }, process.env.SECRET);
      res.status(200).send({ msg: "login successfully", token: token });
    } else {
      res.send({ msg: "Invalid Credential" });
    }
  } else {
    res.send({ msg: "Invalid Credential" });
  }
});

module.exports = { signupRoute };
