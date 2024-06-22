import Express, { text } from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMIddleware.js";
const router = Express.Router();

router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// Forgot password || POST
router.post("/forgot-password", forgotPasswordController);

// text route
router.post("/test", requireSignIn, isAdmin, testController);

// protected user auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController)

// orders
router.get('/orders', requireSignIn, getOrdersController)

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

/// order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router;
