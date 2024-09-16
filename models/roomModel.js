import mongoose from "mongoose";
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Room titlr is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    maxPeople: {
      type: Number,
      required: [true, "Number of maximum people is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: [{ type: [Date] }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
