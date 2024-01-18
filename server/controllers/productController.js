// Importing Product Model
import Product from "../models/productModel.js";

// Import Aync Error Handler Middleware
import catchAyncErrors from "../middleware/catchAyncErrors.js";

// Import Utils
import ErrorHandler from "../utils/errorHandler.js";

// Create Product -- Admin

export const createProduct = catchAyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products -- Public

export const getAllProducts = catchAyncErrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

// Get Recommended Products -- Public

export const getRecommendedProducts = catchAyncErrors(async (req, res) => {
  const products = await Product.aggregate([{ $sample: { size: 6 } }]);
  res.status(200).json({ success: true, products });
});

// Get one product from each category -- Public

export const getOneProductFromEachCategory = catchAyncErrors(
  async (req, res) => {
    const categories = ["dress", "kurtis", "night-suits", "suits"];
    const products = await Promise.all(
      categories.map(async (category) => {
        const product = await Product.aggregate([
          { $match: { category } },
          { $sample: { size: 1 } },
          { $project: { _id: 1, name: 1, price: 1, images: 1 } },
        ]);
        return { category, product: product[0] };
      })
    );
    res.status(200).json({ success: true, products });
  }
);

// Update Product -- Admin

export const updateProduct = catchAyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- Admin

export const deleteProduct = catchAyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Get Single Product -- Public

export const getSingleProduct = catchAyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Create new review and update product review -- Public

export const createProductReview = catchAyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.rating = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    review: product.reviews,
  });
});

// Get all review of a product -- Public

export const getProductReviews = catchAyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review of a product -- Public

export const deleteReview = catchAyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product.reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  if (product.reviews.length === 0) {
    product.rating = 0;
    product.numOfReviews = 0;
  } else {
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.rating = avg / product.reviews.length;
    product.numOfReviews = product.reviews.length;
  }

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
