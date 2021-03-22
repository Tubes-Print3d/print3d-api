const mongoose = require('mongoose')

const BahanSchema = mongoose.Schema({
  Jumlah : { type : Number, required : true, default : 1},
  Warna : { type : String, required : true},
  namaBahan : { type :String , required : true}
})
module.exports = mongoose.model('Bahan', BahanSchema)