const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  UpdateProduct,
  DelteProduces,
} = require(`../controllers/productController`);

router.route('/products').get(getProducts); //TODO: get data from db
router.route('/product/new').post(newProduct); //TODO: post data into db
router.route('/product/:id').get(getSingleProduct); //TODO: get single product with id

//**admin routes */
router
  .route('/admin/product/:id')
  .put(UpdateProduct) //TODO: update data from id in db
  .delete(DelteProduces); //TODO: delte data from id in db

//**export module */
module.exports = router;
