import Express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMIddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = Express.Router();

// Routes

// create new product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all product
router.get("/get-products", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  updateProductController
);

// product filter
router.post("/product-filters", productFiltersController)

// count product
router.get("/product-count", productCountController)

// product per page
router.get('/product-list/:page', productListController)

// search product
router.get('/search/:keyword', searchProductController)

// related product
router.get('/related-product/:pid/:cid', realtedProductController)

// category wise product
router.get('/product-category/:slug', productCategoryController)

// payment routes
// token
router.get('/braintree/token', braintreeTokenController)

// payements
router.post('/braintree/payement', requireSignIn, braintreePaymentController)

export default router;
