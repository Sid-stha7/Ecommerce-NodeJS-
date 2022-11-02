//**it basically protects the routers for unauthorized users

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

//?JWT_SECRET is optional i used because the env is not working
const JWT_SECRET = 'abc123';
// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }

  const decoded = jwt.verify(token, JWT_SECRET); //!!the jwt secret key is not being taken!!should be process.env.JWT_SECRET //
  req.user = await User.findById(decoded.id);

  next();
});

//user roles and setting control the features of the app

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
