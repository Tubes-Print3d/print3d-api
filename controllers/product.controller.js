const responser = require("../utils/responser");
const service = require("../services/product");

const addProduct = async (req, res) => {
  const body = {...req.body, pemilik : res.locals.auth};
  const payload = await service.addProduct(body);
  responser(res, payload, 200);
};
const listProduct = async (req, res) => {
  const payload = await service.listProduct(req.params);
  responser(res, payload, 200);
};
module.exports = {
  addProduct,
  listProduct,
};
