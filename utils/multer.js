const { REQUEST_URI_TOO_LONG } = require("http-status-codes");
const multer = require("multer");
const path = require("path");
const BaseError = require("../errors/base_error");
const fs = require('fs')

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive:true});
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileNewName = `${Date.now()}${fileExtension}`;
    cb(null, fileNewName);
  },
});

const upload = multer({ storage });

const fileUploader = (req, res, next) => {
  upload.array("images", 3)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    if (!req.files || req.files.length !== 3) {
      return res.status(400).json({ msg: "You must upload exactly 3 images" });
    }

    req.fileUrls = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    next();
  });
};

const singleFile = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "You can upload only 1 image" });
    }
    req.fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    next();
  });
};

const multipleFields = (req, res, next) => {
  upload.fields([
    { name: "external_photo", maxCount: 1 },
    { name: "inner_photo", maxCount: 1 },
    { name: "model_photo", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return next(BaseError.BadRequestError("Please provide proper files"));
    }
    if (
      !req.files ||
      !req.files["external_photo"] ||
      !req.files["inner_photo"] ||
      !req.files["model_photo"]
    ) {
      return next(
        BaseError.BadRequestError(err.message)
      );
    }
    req.fileUrl1 = `${req.protocol}://${req.get("host")}/uploads/${
      req.files["external_photo"][0].filename
    }`;
    req.fileUrl2 = `${req.protocol}://${req.get("host")}/uploads/${
      req.files["inner_photo"][0].filename
    }`;
    req.fileUrl3 = `${req.protocol}://${req.get("host")}/uploads/${
      req.files["model_photo"][0].filename
    }`;

    next();
  });
};

module.exports = { fileUploader, singleFile, multipleFields };
