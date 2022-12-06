const { Router } = require("express");
const ProductModel = require("../models/productModel");
const authentication = require("../middlewares/authentication");

let productRoute = Router();
productRoute.use(authentication);

productRoute.get("/", async (req, res) => {
  let { userId } = req.body;
  let data = await ProductModel.find({ userId: userId });
  res.send(data);
});

productRoute.post("/add", async (req, res) => {
  let data = new ProductModel(req.body)
  try{
    await data.save();
    res.send({msg : "product added"})
  }
  catch{
    res.send({msg : 'something went wrong'})
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  let product = await ProductModel.findOneAndDelete({
    _id: id,
    userId: req.body.userId,
  });
  if (product) {
    res.status(200).send({ msg: "product deleted" });
  } else {
    res.status(404).send({ msg: "something went wrong" });
  }
});

productRoute.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  let data = req.body;
  let product = await ProductModel.findOneAndUpdate(
    {
      _id: id,
      userId: req.body.userId,
    },
    data
  );
  if (product) {
    res.status(200).send({ msg: "product updated" });
  } else {
    res.status(404).send({ msg: "something went wrong" });
  }
});

module.exports = productRoute;
