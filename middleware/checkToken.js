const BaseError = require("../errors/base_error");
const jwt = require("jsonwebtoken");

const tokenChecker = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw BaseError.UnauthorizedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    let payload = jwt.verify(token, process.env.ACCESS_SECRET);

    req.user = { userId: payload.id || payload.userId || payload.sub || payload._id };

    if (!req.user.userId) {
      throw BaseError.UnauthorizedError("Invalid token payload");
    }

    next();
  } catch (error) {
    throw BaseError.UnauthorizedError("Authentication invalid");
  }
};


const checkAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw BaseError.UnauthorizedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    let payload = jwt.verify(token, process.env.ACCESS_SECRET);

    if (payload.role !== "admin") {
      throw BaseError.UnauthorizedError("You are not an admin");
    }

    req.user = { userId: payload.id || payload.userId || payload.sub || payload._id, role: payload.role };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: " + error.message });   
  }
};

module.exports = {tokenChecker, checkAdminToken};