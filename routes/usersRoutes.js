import express from "express";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js";
const router = express.Router();
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );
router.use(authController.protect);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(authController.restrictTo("admin"), userController.updateUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);
export default router;
