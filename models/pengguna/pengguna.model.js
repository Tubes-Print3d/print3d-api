const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const AlamatSchema = require("../../schemas/alamat.schema");

const MaterialSchema = mongoose.Schema({
  jenis: { type: String, required: true },
  tersedia: { type: Boolean, required: true, default: true },
});

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
  roles: [{ type: String, enum: ["pencetak", "desainer"] }],
  // Field Pelanggan
  keranjang: [{ type: ObjectId, ref: "Produk" }],
  listAlamat: [{ type: AlamatSchema }],
  alamatDefault: { type: ObjectId },
  //Field Pencetak
  lokasiPencetak: {
    type: ObjectId,
  },
  listMaterial: [{ type: MaterialSchema }],
});

module.exports = mongoose.model("Pengguna", PenggunaSchema);
