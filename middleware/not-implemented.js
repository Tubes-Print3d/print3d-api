const { StatusCodes } = require("http-status-codes");
const { ResError } = require("../utils/responser");

module.exports = (req, res, next) => {
  next(ResError("Not Implemented", StatusCodes.NOT_IMPLEMENTED));
};
