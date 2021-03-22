const mongoose = require("mongoose");
const Pengguna = require("./pengguna.model");
const options = require("./options");

const AdminSchema = mongoose.Schema({}, options);

module.exports = Pengguna.discriminator("Admin", AdminSchema);
