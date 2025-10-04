const mongoose = require("mongoose");

// Define the schema for a Product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create a model from the schema and export it
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
