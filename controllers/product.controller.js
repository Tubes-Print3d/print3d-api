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

const editProduct = async (req, res) => {
  const body = req.body;
  const payload = await service.editProduct(req.params.id, body);
  responser(res, payload, 200);
};

const deleteProduct = async (req, res) => {
  const payload = await service.deleteProduct(req.params.id);
  responser(res, payload, 200);
};

module.exports = {
  addProduct,
  listProduct,
  editProduct,
  deleteProduct,
};
