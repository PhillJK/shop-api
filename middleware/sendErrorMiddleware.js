module.exports = function (error, req, res, next) {
    console.error(error);
    res.status(error.status || 500);
    res.json({
        success: false,
        status: error.status,
        error: {
            message: error.message
        }
    });
};
