import express from "express";
import * as hotelController from "../controllers/hotelControllers.js";
import * as authController from "../controllers/authController.js";
const router = express.Router();
router
  .route("/")
  .get(hotelController.getAllHotels)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    hotelController.createHotel
  );
router.route("/find/:id").get(hotelController.getHotel);
router
  .route("/:id")
  .patch(authController.protect,authController.restrictTo("admin"), hotelController.updateHotel)
  .delete(authController.protect,authController.restrictTo("admin"), hotelController.deleteHotel);
router.route("/countByCity").get(hotelController.countByCity);
router.route("/countByType").get(hotelController.countByType);
router.route("/room/:id").get(hotelController.getHotelRooms);
export default router;
