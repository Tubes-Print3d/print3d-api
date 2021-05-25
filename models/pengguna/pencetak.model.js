const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");
const options = require("./options");
const AlamatSchema = require("../../schemas/alamat.schema");
const { ObjectId } = mongoose.Types;

const MaterialSchema = mongoose.Schema({
  jenis: { type: String, required: true },
  tersedia: { type: Boolean, required: true, default: true },
});
const PencetakSchema = mongoose.Schema(
  {
    lokasiPencetak: {
      type: AlamatSchema,
      required: true,
    },
    listMaterial: [{ type: MaterialSchema }],
  },
  options
);

module.exports = Pengguna.discriminator("Pencetak", PencetakSchema);
