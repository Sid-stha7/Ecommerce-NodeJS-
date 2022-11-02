const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieparser = require('cookie-parser');
app.use(express.json());
app.use(cookieparser());
//import routes
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', auth);
app.use('/api/v1', products);

//middleware to handel errors
app.use(errorMiddleware);

module.exports = app;
