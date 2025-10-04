const Product = require("../models/Practice3");

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating product", error: error.message });
  }
};

// @desc    Get all products (with optional category filter)
// @route   GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// @desc    Add a new review to a product
// @route   POST /api/products/:productId/reviews
const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const newReview = req.body;

    // Find the product and push the new review into its reviews array
    // The $push operator is a clean way to add an element to an array
    // { new: true } ensures the updated document is returned
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview } },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json(updatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding review", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  addReview,
};
