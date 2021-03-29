const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
});

PenggunaSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("Pengguna", PenggunaSchema);
