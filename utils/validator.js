const { validationResult } = require("express-validator");

const error = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({ status: 422, error: errors.array() });
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
