module.exports = (req, res, next) => {
  next({
    status: 404,
    error: "This URL does not exists",
  });
};
