const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");

const PencetakSchema = mongoose.Schema({
  alamatPengiriman: { type: ObjectId, required: true, ref: 'alamatPengiriman' },
  listMesin: { type: ObjectId, ref: 'MesinCetak' },

});

module.exports = Pengguna.discriminator("Pencetak", PencetakSchema, {
  discriminatorKey: "tipe ",
});
