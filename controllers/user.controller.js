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

module.exports = {
  register,
  login,
};
