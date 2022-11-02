const cookie = require('cookieparser');
const dotenv = require('dotenv');
dotenv.config({ path: '../config/config.env' });

// require('dotenv').config('../config/config.env');
// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  //   Options for cookie
  //!!!a bug is here dot env file is not loading here!!
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //!!here shound be process.env.COOKIE_EXPIRES_TIME
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
