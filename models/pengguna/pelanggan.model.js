const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");
const { ObjectId } = mongoose.Types;

const PelangganSchema = mongoose.Schema({
  keranjang: [{ type: ObjectId, ref: "LineItem" }],
});

module.exports = Pengguna.discriminator("Pelanggan", PelangganSchema, {
  discriminatorKey: "tipe ",
});
