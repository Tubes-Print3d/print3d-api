const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");
const options = require("./options");
const { ObjectId } = mongoose.Types;

const PelangganSchema = mongoose.Schema(
  {
    keranjang: [{ type: ObjectId, ref: "LineItem" }],
  },
  options
);

module.exports = Pengguna.discriminator("Pelanggan", PelangganSchema);
