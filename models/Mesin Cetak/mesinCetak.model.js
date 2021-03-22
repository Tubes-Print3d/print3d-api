const mongoose = require('mongoose')
const jenisBahan = require('../Bahan.model')

const mesinCetakSchema = mongoose.Schema({
  Ukuran : { type : String, required : true},
  Kualitas : { type : String , required : true},
  jenisBahan : { type :ObjectId, ref : 'JenisBahan' }
  
})
module.exports = mongoose.model('mesinCetak', mesinCetakSchema)