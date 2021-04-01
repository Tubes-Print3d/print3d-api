module.exports = (req, res, next) => {
  next({ status: 501, error: "Not Implemented" });
};
