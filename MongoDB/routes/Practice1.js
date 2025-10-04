const express = require("express");
const Product = require("../models/productModel"); // Import the Product model
const router = express.Router();

// --- Controller Logic ---

// 1. CREATE a new product
// Method: POST /api/products
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); // 201 Created
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating product", error: error.message }); // 400 Bad Request
  }
});

// 2. READ all products (with filtering)
// Method: GET /api/products?name=...&category=...
router.get("/", async (req, res) => {
  try {
    const filter = {};
    // Add filters if they exist in the query string
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: "i" }; // Case-insensitive search
    }
    if (req.query.category) {
      filter.category = { $regex: req.query.category, $options: "i" };
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// 3. UPDATE a product by ID
// Method: PUT /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating product", error: error.message });
  }
});

// 4. DELETE a product by ID
// Method: DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Respond with a success message as per the screenshot
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
