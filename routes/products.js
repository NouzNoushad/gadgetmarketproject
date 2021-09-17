const express = require('express');
const router = express.Router();

//Controllers

//product
const getProductController = require('../controller/productController/getProductController');
const { createProduct, postCreateProduct } = require('../controller/productController/createProductController');
const searchProductController = require('../controller/productController/searchProductController');
const { updateProduct, postUpdateProduct } = require('../controller/productController/updateProductController');
const productDetailsController = require('../controller/productController/productDetailsController');
const deleteProductController = require('../controller/productController/deleteProductController');

//owners
const { ownerCreateProduct, ownerEditProduct, postOwnerCreateProduct, postOwnerEditProduct } = require('../controller/ownershipController/passwordController');
const { createOwner, postCreateOwner } = require('../controller/ownershipController/createOwnerController');
const { recoverPassword, postRecoverPassword } = require('../controller/ownershipController/recoverPasswordController');

//user
const { registerUser, postRegisterUser } = require('../controller/userController/registerUserController');
const { loginUser, postLoginUser } = require('../controller/userController/loginUserController');
const logoutUser = require('../controller/userController/logoutUserController');

//rating
const { rateProduct, postRateProduct } = require('../controller/rateController/rateProductController');

//middleware
const { loginAuth, ensureAuth } = require('../middleware/auth/loginAuth');
const ownerValidation = require('../middleware/passwordAuth');
const searchAuth = require('../middleware/searchAuth');
const uploadAuth = require('../middleware/uploadAuth');

//Users Routes
router.get('/register', loginAuth, registerUser);
router.get('/login', loginAuth, loginUser);
router.get('/logout', logoutUser);

router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);

//Products Routes
router.get('/', searchAuth, getProductController);
router.get('/create', createProduct);
router.get('/update/:id', updateProduct);
router.get('/details/:id', productDetailsController);
router.get('/delete/:id', deleteProductController);

router.post('/', searchAuth, searchProductController);
router.post('/create', uploadAuth, postCreateProduct);
router.post('/update/:id', uploadAuth, postUpdateProduct);

//Rate Routes
router.get('/rating/:id', ensureAuth, rateProduct);

router.post('/rating/:id', postRateProduct);

//Owner Routes
router.get('/ownership', createOwner);
router.get('/password', ownerCreateProduct);
router.get('/passwordEdit/:id', ownerEditProduct);
router.get('/recover', recoverPassword);

router.post('/ownership', postCreateOwner);
router.post('/password', ownerValidation, postOwnerCreateProduct);
router.post('/passwordEdit/:id', ownerValidation, postOwnerEditProduct);
router.post('/recover', postRecoverPassword);

module.exports = router;