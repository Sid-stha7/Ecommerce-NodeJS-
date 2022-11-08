const { trusted } = require('mongoose');
const { response } = require('../app');
const Product = require('../models/product');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const APIFeatures = require('../utils/apiFeatures');

const cloudinary = require('cloudinary');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = async (req, res, next) => {
  const resPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const product = await apiFeatures.query;
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: 'Product are displayed',
      productCount,
      product,
      resPerPage,
    });
  }, 1000);
};

//admin products
exports.adminProducts = async (req, res, next) => {
  const resPerPage = 8;

  const products = await Product.find();
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: 'Product are displayed',
      products,
    });
  }, 1000);
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

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // if (!product) {
  //   return next(new ErrorHandler('Product not found', 404));
  // }

  // // Deleting images associated with the product
  // for (let i = 0; i < product.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     product.images[i].public_id
  //   );
  // }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product is deleted.',
  });
});
