const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/ErrorHandler');

//**Create new order */

exports.newOrder = catchAsyncErrors(async (req,res,next)=>{
    const{}
})