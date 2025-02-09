const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "Please provide model of a car"],
    },
    price: {
      type: Number,
      required: [true, "Price of a car must be provided"],
    },
    engine: {
      type: Number,
      required: [true, "Please provide data on engine"],
    },
    year: {
      type: Number,
      required: [true, "Production year must be provided"],
    },
    color: {
      type: String,
      required: [true, "Please provide color of a car"],
    },
    distance: {
      type: Number,
      required: [true, "Please provide distance"],
    },
    description: {
      type: String,
      maxlength: [100, "You can write at most 100 characters"],
    },
    tinting: {
      type: String,
      required: [true, "Please provide info on tinting"],
      enum: {
        values: ["yes", "no"],
        message: "{VALUE} is not supported",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Category must be provided"],
      ref: "Category",
    },
    images:[String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);


