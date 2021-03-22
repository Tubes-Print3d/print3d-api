const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");

const AdminSchema = mongoose.Schema({});

module.exports = Pengguna.discriminator("Admin", AdminSchema, {
  discriminatorKey: "tipe ",
});
