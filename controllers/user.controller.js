const { StatusCodes } = require("http-status-codes");
const service = require("../services/user");
const { responser } = require("../utils/responser");

const register = async (req, res) => {
  const body = req.body;
  const payload = await service.register(body);
  responser(res, payload, 201);
};

const login = async (req, res, next) => {
  const body = req.body;
  try {
    const payload = await service.login(body);
    responser(res, payload);
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, msg: error });
  }
};

const addRole = async (req, res, next) => {
  try {
    const { newRoles } = req.body;
    const id = res.locals.auth;
    await service.addRole(id, newRoles);
    responser(res, null, StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

const listCarts = async (req, res) => {
  const id = res.locals.auth;
  const carts = await service.listCarts(id);
  responser(res, carts, StatusCodes.OK);
};

const addToCart = async (req, res, next) => {
  const userId = res.locals.auth;
  const productId = req.body.productId;
  try {
    const newItem = await service.addToCart(userId, productId);
    responser(res, newItem, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  const { productId } = req.params;
  const userId = res.locals.auth;
  try {
    const deleted = await service.removeFromCart(userId, productId);
    responser(res, deleted, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  addRole,
  listCarts,
  addToCart,
  removeFromCart,
};
