const mongoose = require('mongoose')

const AlamatSchema = mongoose.Schema({
  Provinsi : { type : String, required : true},
  Kabupaten : { type : String, required : true},
  Kecamatan : { type : String, required : true},
  KodePos : { type : Number, required : true},
  AlamatRumah : { type : String, required : true}
})

module.exports = mongoose.model('Alamat', AlamatSchema)