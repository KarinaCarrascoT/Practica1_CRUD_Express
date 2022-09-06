const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success get product by id",
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

exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    var newProducts = [];
    products.forEach(element => {
      if (element.id != req.params.id)
      { 
        newProducts.push(element);
      }
      else
      {
        newProducts.push(req.body);
      }
    });
    res.status(200).json({
      status: "success update product by id",
      data: {
        product: newProducts,
      },
    });
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  } 
  else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    var newProducts = [];
    products.forEach(element => {
      if (element.id != req.params.id)
      { 
        newProducts.push(element);
      }
    });
    res.status(200).json({
      status: "success delete product by id",
      data: {
        product: newProducts,
      },
    });
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
  } 
  else {
    res.status(404).json({
      status: "not found",
    });
  }
};


