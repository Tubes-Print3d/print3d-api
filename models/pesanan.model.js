const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PesananSchema = mongoose.Schema({
  idPelanggan: { type: ObjectId, required: true, ref: "Pengguna" },
  alamatPengiriman: { type: String, required: true },
  mesinCetak: { type: ObjectId, required: true },
  listCetak: [
    {
      idProduk: { type: ObjectId, required: true, ref: "Produk" },
      bahan: { type: ObjectId, required: true },
      kuantitas: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Pesanan", PesananSchema);
