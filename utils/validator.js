const { validationResult } = require("express-validator");
const { ResError } = require("./responser");

const error = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(ResError(errors.array(), 422));
  }
  next();
};

const wrap = (validators) => {
  for (const validatorName in validators) {
    validators[validatorName].push(error);
  }
  return validators;
};

module.exports = { wrap, error };
