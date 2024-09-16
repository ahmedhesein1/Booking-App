import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import { promise } from "bcrypt/promises.js";
export const getAllHotels = asyncHandler(async (req, res, next) => {
  const { min, max, ...others } = req.query;
  const hotels = await Hotel.find({
    ...others,
    cheapestPrice: { $gt: min || 1, $lt: max || 999 },
  }).limit(req.query.limit);
  if (!hotels) {
    return next(new AppError("No Hotels Found"));
  }
  res.status(200).json({
    success: true,
    data: {
      hotels,
    },
  });
  next();
});
export const createHotel = asyncHandler(async (req, res, next) => {
  const newHotel = await Hotel.create(req.body);
  res.status(201).json({
    success: true,
    data: {
      newHotel,
    },
  });
  next();
});
export const getHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    return next(new AppError("Hotel Not Found"));
  }
  res.status(200).json({
    success: true,
    data: {
      hotel,
    },
  });
  next();
});
export const updateHotel = asyncHandler(async (req, res, next) => {
  const newHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!newHotel) {
    return next(new AppError("Hotel Not Found"));
  }
  res.status(201).json({
    success: true,
    data: {
      newHotel,
    },
  });
  next();
});
export const deleteHotel = asyncHandler(async (req, res, next) => {
  const newHotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!newHotel) {
    return next(new AppError("Hotel Not Found"));
  }
  res.status(201).json({
    success: true,
    data: null,
  });
  next();
});
export const countByCity = asyncHandler(async (req, res, next) => {
  const cities = req.query.cities.split(",");
  const list = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city: city });
    })
  );
  res.status(200).json(list);
  next();
});
export const countByType = asyncHandler(async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const appartmentCount = await Hotel.countDocuments({ type: "appartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "appartments", count: appartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
});
export const getHotelRooms = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  res.status(200).json(list);
});
