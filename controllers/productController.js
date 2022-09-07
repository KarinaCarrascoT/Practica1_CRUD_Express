const { Console } = require("console");
const fs = require("fs");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
};

exports.getProductById = async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.updateProductByID = async (req, res) => {
    const upProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
      if (upProduct) {
        res.status(200).json({
          status: "success",
          data: {
            product: upProduct,
          },
        });
      } else {
        res.status(404).json({
          status: "not found",
        });
      }
};

exports.deleteProductByID = async (req, res) => {
  Product.findByIdAndRemove(req.params.id, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Remove Success : ", docs);
      }
      return;
  });

};
