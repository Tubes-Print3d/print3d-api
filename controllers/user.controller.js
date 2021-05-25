const { StatusCodes } = require("http-status-codes");
const service = require("../services/user");
const { responser } = require("../utils/responser");

const register = async (req, res) => {
  const body = req.body;
  const payload = await service.register(body);
  responser(res, payload, 201);
};

const login = async (req, res) => {
  const body = req.body;
  const payload = await service.login(body);
  responser(res, payload);
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

module.exports = {
  register,
  login,
  addRole,
};
