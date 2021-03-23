const multer = require("multer");

const limits = 1024 * 1024 * 5;

const error = new Error("File type is not supported");
error.status = 400;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png")
        return cb(null, true);
    error.message += `. Type: ${file.mimetype}`;
    cb(error, false);
};

module.exports = multer({ storage, limits, fileFilter });
