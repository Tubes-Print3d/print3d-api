const mongoose = require('mongoose')
const { schema } = require('./Alamat/alamat.model')

const Dateschema = mongoose.Schema({
    tanggal : { type : Number, required: true},
    bulan : { type : String , required: true},
    tahun : { type : Number, required : true}
})
module.exports = mongoose.model('Date', Dateschema)