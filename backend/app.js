const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
app.use(express.json());
//import routes
const products = require('./routes/product');

app.use('/api/v1', products);

//middleware to handel errors
app.use(errorMiddleware);

module.exports = app;
