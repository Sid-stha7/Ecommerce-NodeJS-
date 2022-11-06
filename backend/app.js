const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieparser = require('cookie-parser');
app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

const CLOUDINARY_CLOUD_NAME = 'dfd1u3mh8';
const CLOUDINARY_API_KEY = 744926522348531;
const CLOUDINARY_API_SECRET = 'Gs5yeLgaGwsv4Zrro0wdrPFlUuU';
//setting up cloudinary config:
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
//import routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', auth);
app.use('/api/v1', products);
app.use('/api/v1', order);

//middleware to handel errors
app.use(errorMiddleware);

module.exports = app;
