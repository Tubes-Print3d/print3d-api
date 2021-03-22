const mongoose = require('mongoose')
const AlamatPengirimanModel = require('../Alamat/alamat.model')

const PenggunaSchema = mongoose.Schema({
  nama: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  kontak: [{ type: String }],
  alamat : [{ type : ObjectId, ref : 'AlamatPengirimanModel'}],
  statePengguna: {
    type: String,
    enum: ['pending', 'verified', 'accepted', 'banned'],
    default: 'pending'
  }
})

module.exports = mongoose.model('Pengguna', PenggunaSchema)