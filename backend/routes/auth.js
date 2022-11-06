const express = require('express');

const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

//**admin routes */
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
