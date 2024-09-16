import express from "express";
import * as authController from "../controllers/authController.js";
import * as roomController from "../controllers/roomController.js";
const router = express.Router();
router.route("/").get(roomController.getAllRooms);
router
  .route("/:hotelId")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.createRoom
  );
router
  .route("/:id")
  .get(roomController.getRoom)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.updateRoom
  );
router
  .route("availability/id")
  .patch(authController.protect, roomController.updateRoomAvailability);
router
  .route("/:id/:hotelId")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.deleteRoom
  );
export default router;
