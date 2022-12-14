const express = require('express');
const router = express.Router();
const expressFormidable = require('express-formidable');
const {
  getProducts,
  newProduct,
  getSingleProduct,
  UpdateProduct,
  deleteProduct,

  adminProducts,
} = require(`../controllers/productController`);
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/products').get(getProducts); //TODO: get data from db

router.route('/admin/products').get(adminProducts); //TODO: get data from db
router.route('/product/:id').get(getSingleProduct); //TODO: get single product with id

//**admin routes */
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct); //TODO: post data into db

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), UpdateProduct) //TODO: update data from id in db
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct); //TODO: delte data from id in db

//**export module */
module.exports = router;
