const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const MesinCetakSchema = mongoose.Schema({
  ukuran : { type : String, required : true},
  kualitas : { type : String , required : true},
  pemilik : {type : ObjectId, ref : 'Pencetak'},
  jenisBahan2 : [{ type : ObjectId, ref : 'JenisBahan' }]
})

module.exports = mongoose.model('MesinCetak', MesinCetakSchema)