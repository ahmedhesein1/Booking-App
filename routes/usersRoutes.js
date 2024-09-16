import express from "express";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";
const router = express.Router();
router.use(authController.protect);
router.route("/").get(authController.restrictTo("admin"),userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.protect,authController.restrictTo("admin"),userController.updateUser)
  .delete(authController.protect,authController.restrictTo("admin"),userController.deleteUser);
export default router;
