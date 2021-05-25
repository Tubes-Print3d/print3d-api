const mongoose = require("mongoose");
const PoinSchema = require("./poin.schemas");

const AlamatSchema = mongoose.Schema({
  provinsi: { type: String, required: true },
  kabupaten: { type: String, required: true },
  kecamatan: { type: String, required: true },
  kodepos: { type: String, required: true },
  alamat: { type: String, required: true },
  koordinat: { type: PoinSchema, required: true },
});

module.exports = AlamatSchema;
