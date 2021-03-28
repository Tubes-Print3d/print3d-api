const Pengguna = require("../../models/pengguna/pengguna.model");
const services = require("./user.service");
module.exports = services(Pengguna);
