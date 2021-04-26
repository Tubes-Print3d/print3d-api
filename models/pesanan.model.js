const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PesananSchema = mongoose.Schema({
  alamatPengiriman: { type: ObjectId, required: true },
  mesinCetak: { type: ObjectId, required: true },
  listCetak: [
    {
      idProduk: { type: ObjectId, required: true },
      material: { type: ObjectId, required: true },
      kuantitas: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model('Pesanan', PesananSchema);
