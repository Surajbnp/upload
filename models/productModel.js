const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name : String,
  brand : String,
  mrp : String,
  batch : String,
  mfg : String,
  exp : String,
  quantity : Number,
  imageUrl : String,
  userId : String
},{versionKey : false});

const ProductModel = mongoose.model("data", productSchema);

module.exports = ProductModel;
