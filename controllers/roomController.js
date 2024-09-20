import Room from "../models/roomModel.js";
import Hotel from "../models/hotelModel.js";
import AppError from "../utils/appError.js";
import asyncHandler from "express-async-handler";
export const getAllRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Room.find();
  if (!rooms) {
    return next(new AppError("No Rooms Found"));
  }
  res.status(200).json({
    success: true,
    data: {
      rooms,
    },
  });
  next();
});
export const createRoom = asyncHandler(async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = await Room.create(req.body);
  await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
  res.status(200).json({
    success: true,
    data: newRoom,
  });
  next();
});
export const getRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new AppError("Room Not Found"));
  }
  res.status(200).json({
    success: true,
    data: {
      room,
    },
  });
  next();
});
export const updateRoom = asyncHandler(async (req, res, next) => {
  const newRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!newRoom) {
    return next(new AppError("Room Not Found"));
  }
  res.status(201).json({
    success: true,
    data: {
      newRoom,
    },
  });
  next();
});
export const updateRoomAvailability = asyncHandler(async (req, res, next) => {
  const newRoom = await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
  );
  if (!newRoom) {
    return next(new AppError("Room Not Found"));
  }
  res.status(201).json({
    success: true,
    data: {
      newRoom,
    },
  });
  next();
});
export const deleteRoom = asyncHandler(async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return next(new AppError("Room Not Found"));
  }
  await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
  res.status(201).json({
    success: true,
    data: null,
  });
  next();
});
