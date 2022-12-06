const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();


app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const connection = require("./database/db");
const { signupRoute } = require("./routes/Authentication");
const productRoute = require("./routes/Products");

app.get("/", (req, res) => {
  res.send("HomePage");
});

// Authorization Route
app.use("/auth", signupRoute);

// Product Route
// app.use(authentication)
app.use("/products", productRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
