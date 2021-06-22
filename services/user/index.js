const Pengguna = require("../../models/pengguna/pengguna.model");
const Produk = require("../../models/produk.model");
const services = require("./user.service");
module.exports = services(Pengguna, Produk);
