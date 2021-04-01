const responser = require("../utils/responser");
const service = require("../services/user");

const register = async (req, res) => {
  const body = req.body;
  const payload = await service.register(body);
  responser(res, payload, 200);
};

const login = async (req, res) => {
  const body = req.body;
  const payload = await service.login(body);
  responser(res, payload, 200);
};

module.exports = {
  register,
  login,
};
