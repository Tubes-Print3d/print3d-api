const service = require("../services/product");
const { responser } = require("../utils/responser");

const addProduct = async (req, res) => {
  const body = { ...req.body, pemilik: res.locals.auth };
  const payload = await service.addProduct(body);
  responser(res, payload, 201);
};

const listProduct = async (req, res) => {
  const payload = await service.listProduct(req.query);
  responser(res, payload);
};

module.exports = {
  addProduct,
  listProduct,
};
