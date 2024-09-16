import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new AppError("user is not logged in please log in", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("Could not find User", 403));
  }
  req.user = user;
  decoded
    ? next()
    : next(new AppError("invalid token please log in again", 403));
});

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const user = await User.find({ name });
  if (user.length > 0) {
    return next(new AppError("user is already existed", 401));
  }
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
  res.status(201).json({
    success: true,
    data: {
      newUser,
    },
  });
});
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isEqual = await bcrypt.compare(password, user.password);
  if (!user || !isEqual) {
    return next(new AppError("email or password is not valid", 403));
  }
  const JWT = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "90d",
    }
  );
  res
    .cookie("access_token", JWT, {
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Login succeded",
      JWT,
      email,
      name: user.name,
    });
});
export const logout = asyncHandler(async (req, res, next) => {
  res
    .cookie("access_token", "", {
      expiresIn: new Date(0),
    })
    .json({
      success: true,
      message: "Loggedout successfully",
    });
  next();
});
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError("You are not allowed to do this action", 403));
    }
    next();
  };
};
