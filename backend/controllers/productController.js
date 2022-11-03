const { trusted } = require('mongoose');
const { response } = require('../app');
const Product = require('../models/product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const APIFeatures = require('../utils/apiFeatures');

//create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const product = await apiFeatures.query;
  res.status(200).json({
    success: true,
    message: 'Product are displayed',
    productCount,
    product,
  });
};

// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
};

///update product => api/v1/product:id

exports.UpdateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidatiors: false,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//Delete product => /api/v1/admin/product/id

exports.DelteProduces = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Product is deleted',
  });
};