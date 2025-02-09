const BaseError = require("../errors/base_error");
const jwt = require("jsonwebtoken");
const {createToken} = require('../token/generate_token')

const refresh = (req, res, next) => {
  const refreshtoken = req.cookies.refreshToken

  if (!refreshtoken) {
    throw BaseError.BadRequestError("Refresh token not found");
  }

  try {
      let decode = jwt.verify(refreshtoken, process.env.REFRESH_SECRET);
      if (!decode) {
        throw BaseError.UnauthorizedError("Invalid refresh token");
      }
    
      let payload = { email: decode.email, id: decode._id, role: decode.role };
      let createtoken = createToken(payload);
    
      res.cookie("createtoken", createtoken, {
        httpOnly: true,
        maxAge: 900 * 1000,
      });
      res.status(200).json({message: "refresh token is working"})
  } catch (error) {
    next(error)
  }

};

module.exports = refresh;
