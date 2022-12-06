const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const SignupModel = mongoose.model("user", signupSchema);

module.exports = SignupModel;
