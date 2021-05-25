const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
  next(ResError("This URL does not exists", StatusCodes.NOT_FOUND));
};
