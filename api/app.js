import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import globalErrorHandler from './controllers/errorController.js'
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/usersRoutes.js';
import hotelRoute from './routes/hotelsRoutes.js';
import roomRoute from './routes/roomsRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
const DB = process.env.MONGO;
mongoose.connect(DB).then(() => {
  console.log("Database connected successfully");
}).catch(() => {
  console.log('Database connection failed');
});
app.use('/api/auth',authRoute)
app.use("/api/hotels", hotelRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use(globalErrorHandler);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
