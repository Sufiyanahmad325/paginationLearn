import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String, // image URL
      required: true
    },

    category: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    },

  },
  { timestamps: true }
);

export const Card = mongoose.model("Card", cardSchema);