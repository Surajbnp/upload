require("dotenv").config();
let jwt = require("jsonwebtoken");


const authentication = (req, res, next) => {
  const token = req.headers?.authorization;

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      res.send({ msg: "Session expired, please login" });
    } else {
      req.body.userId  = decoded.userId;
      next();
    }
  });
};

module.exports = authentication;
