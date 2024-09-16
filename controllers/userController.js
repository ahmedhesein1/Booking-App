import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new AppError("No Users Found"));
  }
  res.status(200).json({
    success: true,
    data: {
      users,
    },
  });
  next();
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User Not Found"));
  }
  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
  next();
});
export const updateUser = asyncHandler(async (req, res, next) => {
  const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!newUser) {
    return next(new AppError("User Not Found"));
  }
  res.status(201).json({
    success: true,
    data: {
      newUser,
    },
  });
  next();
});
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("User Not Found"));
  }
  res.status(201).json({
    success: true,
    data: null,
  });
  next();
});
