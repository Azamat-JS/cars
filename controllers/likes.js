const Like = require("../models/Likes");

const pressLike = async (req, res, next) => {
  try {
     req.body.userId = req.user.userId
     const {carId, userId} = req.body

    const existingLike = await Like.findOneAndDelete({ userId, carId });

    if (existingLike) {
      const likeCount = await Like.countDocuments({ carId });
      return res
        .status(200)
        .json({ message: "Unliked successfully", count: likeCount });
    }

    await Like.create({ userId, carId });

    const likeCount = await Like.countDocuments({ carId });
    return res
      .status(201)
      .json({ message: "Liked successfully", count: likeCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = pressLike;

