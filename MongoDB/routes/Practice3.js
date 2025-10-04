const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  addReview,
} = require("../controllers/Practice3");

// Route to get all products and create a new product
router.route("/").get(getAllProducts).post(createProduct);

// Route to add a review to a specific product
router.route("/:productId/reviews").post(addReview);

module.exports = router;
