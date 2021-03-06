const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const ProdukSchema = mongoose.Schema({
  nama: { type: String, required: true },
  fileModel: { type: ObjectId },
  previewImage: { type: ObjectId },
  visibility: { type: Boolean, default: true },
  royalty: { type: Number, default: 0 },
  pemilik: { type: ObjectId, ref: "Pengguna" },
  deskripsi: { type: String },
});

module.exports = mongoose.model("Produk", ProdukSchema);
