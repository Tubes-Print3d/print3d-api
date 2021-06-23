const mongoose = require("mongoose");

const BahanSchema = mongoose.Schema({
  nama: { type: String, required: true },
  warna: { type: String, required: true },
  tersedia: { type: Boolean, default: true },
});

module.exports = mongoose.model("Bahan", BahanSchema);
