const Category = require("../models/Category");
const Car = require("../models/Car");
const BaseError = require("../errors/base_error");

const getAllCategories = async (req, res, next) => {
  const categories = await Category.find();
  if(!categories){
    return next(BaseError.NotFoundError('There is no any categories'))
  }
  res.status(200).json(categories);
};

const getOneCategory = async (req, res, next) => {
  const { brand } = req.params;
  const category = await Category.findOne({
    brand: { $regex: brand, $options: "i" },
  });
  if (!category) {
    return next(BaseError.NotFoundError("Such brand not found"));
  }
  const cars = await Car.find({ category: category._id });
  res.status(200).json(cars);
};

const addCategory = async (req, res, next) => {
  try {
    if (!req.fileUrl) {
      return res.status(400).json({ msg: "Please upload an image" });
    }

    const { brand } = req.body;
    if(!brand){
      return next(BaseError.BadRequestError('Please provide brand'))
    }

    const category = await Category.create({
      brand,
      image: req.fileUrl,
    });

    if (!category) {
      return next(BaseError.NotFoundError(`There is no brand like: ${brand}`))
    }
    res.status(201).json({
      msg: "Category added successfully",
      category,
    });
  } catch (err) {
    console.error("Error in addCategory:", err);
    res.status(500).json({
      msg: "Error adding category",
      error: err.message,
    });
  }
};

const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const editCategory = req.body;
  if (req.fileUrl) {
    editCategory.image = req.fileUrl;
  }
  const category = await Category.findByIdAndUpdate(categoryId, editCategory, {
    new: true,
    runValidators: true
  });
  if(!category){
    return next(BaseError.NotFoundError(`There is no category with id: ${categoryId}`))
  }
  res.status(200).json({
    msg: "category updated successfully",
    category,
  });
};

const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId);
  if(!category){
    return next(`There is no category with id: ${categoryId}`)
  }
  res.status(200).json({ msg: "The category deleted successfully" });
};

module.exports = {
  getAllCategories,
  addCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
