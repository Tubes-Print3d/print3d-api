const Produk = require("../../models/produk.model");
const services = require("./product.service");
module.exports = services(Produk);