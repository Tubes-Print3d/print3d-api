const mongoose = require('mongoose')


const Pesananscheme = mongoose.Schema({
    tanggalPenan : { type: ObjectId, ref : 'Date'},
    tanggalKirim : { type : ObjectId , ref : 'Date'},
    pencetak : { type : ObjectID, ref :'pencetak'},
    kirimDari : {type : ObjectID , ref : 'alamatPencetak'},
    kirimKe : { type : ObjectID, ref : 'alamatPengiriman'},
    status : { type : ObjectID , ref : 'statusPemesanan'},
    Total : { type : Number, default : 0}

})