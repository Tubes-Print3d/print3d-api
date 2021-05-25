const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");
const options = require("./options");
const AlamatSchema = require("../../schemas/alamat.schema");
const { ObjectId } = mongoose.Types;

const PelangganSchema = mongoose.Schema(
  {
    keranjang: [{ type: ObjectId, ref: "Produk" }],
    listAlamat : [{type : AlamatSchema, required : true}],
    alamatDefault : {type : ObjectId}
  },
  options
);

module.exports = Pengguna.discriminator("Pelanggan", PelangganSchema);
