const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const AlamatSchema = require("../../schemas/alamat.schema");

const PenggunaSchema = mongoose.Schema({
  nama: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  kontak: [{ type: String }],
  statePengguna: {
    type: String,
    enum: ["pending", "verified", "accepted", "banned"],
    default: "pending",
  },
  roles: [{ type: String, enum: ["pencetak", "desainer"] }], // roles dasar adalah pelanggan
  listAlamat: [{ type: AlamatSchema }],

  // Field Pelanggan
  keranjang: [{ type: ObjectId, ref: "Produk" }],
  alamatDefault: { type: ObjectId }, // id dari salah satu alamat di dalam list alamat

  //Field Pencetak
  lokasiPencetak: {
    type: ObjectId,
  },
  // listMaterial: [{ type: MaterialSchema }],
});

module.exports = mongoose.model("Pengguna", PenggunaSchema);
