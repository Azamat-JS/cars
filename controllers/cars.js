const BaseError = require("../errors/base_error");
const Car = require("../models/Car");

const getAllCars = async (req, res) => {
  const { model, sort, numericFilters, fields } = req.query;
  const queryObject = {};

  if (model) {
    queryObject.model = { $regex: model, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "year", "engine"];
    filters = filters.split(",").forEach((item) => {
      const [field, key, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [key]: Number(value) };
      }
    });
  }

  let result = Car.find(queryObject).populate("category", "brand");
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const cars = await result;
  res.status(200).json({ cars, count: cars.length });
};

const getSingleCar = async (req, res) => {
  const { carId } = req.params;
  const car = await Car.findById(carId).populate(
    "category",
    "-_id, brand"
  );
  if(!car){
    throw BaseError.NotFoundError(`There is no car with id ${carId}`)
  }

  res.status(200).json(car);
};


const addCar = async (req, res) => {
  try {
    const { model, price, engine, year, category, distance, tinting, color, description } = req.body;

    if (!req.fileUrls || req.fileUrls.length === 0) {
      return res.status(400).json({ msg: "Please upload at least three images" });
    }

    const car = await Car.create({
      model,
      price,
      engine,
      year,
      color,
      distance,
      description,
      tinting,
      category,
      images: req.fileUrls
    });

    res.status(201).json({
      msg: "A new car added successfully",
      car,
    });
  } catch (err) {
    console.error("Error in addCar:", err);
    res.status(500).json({
      msg: "Error with adding car",
      error: err.message,
    });
  }
};


const updateCar = async (req, res, next) => {
  const { carId } = req.params;
  const editCar = req.body
  if(req.fileUrls){
    editCar.images = req.fileUrls
  }
  const car = await Car.findByIdAndUpdate(carId, editCar, {
    new: true,
    runValidators: true,
  });
  if (!car) {
    return next(BaseError.NotFoundError("There is no car with id:" + carId));
  }

  res.status(201).json({
    msg: "Car updated successfully",
    car: car,
  });
};

const deleteCar = async (req, res, next) => {
  const { carId } = req.params;
 const car = await Car.findByIdAndDelete(carId);
 if(!car){
  return next(BaseError.NotFoundError(`There is no car with id: ${carId}`))
 }
  res.status(200).send("Car deleted successfully");
};

module.exports = {
  getAllCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
};
