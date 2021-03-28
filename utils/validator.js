const { validationResult } = require("express-validator");
const responser = require("./responser");

const error = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responser(
      res,
      errors.array(),
      422,
      "missing parameter"
    );
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
