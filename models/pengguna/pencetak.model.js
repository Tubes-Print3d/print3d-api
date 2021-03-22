const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");
const options = require("./options");
const { ObjectId } = mongoose.Types;

const PencetakSchema = mongoose.Schema(
  {
    alamatPengiriman: {
      type: ObjectId,
      required: true,
      ref: "AlamatPengiriman",
    },
    listMesin: { type: ObjectId, ref: "MesinCetak" },
  },
  options
);

module.exports = Pengguna.discriminator("Pencetak", PencetakSchema);
