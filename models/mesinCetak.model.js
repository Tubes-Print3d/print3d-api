const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const MesinCetakSchema = mongoose.Schema({
  nama: { type: String, required: true },
  spesifikasi: { type: String },
  pemilik: { type: ObjectId, ref: "Pengguna", required: true },
});

module.exports = mongoose.model("MesinCetak", MesinCetakSchema);
