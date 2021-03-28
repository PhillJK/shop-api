const multer = require("multer");

const limits = 1024 * 1024 * 5;

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
    const error = new Error("File type is not supported");
    error.status = 415;
    error.message += `. Type: ${file.mimetype}`;
    cb(error, false);
};

module.exports = multer({ storage, limits, fileFilter });
