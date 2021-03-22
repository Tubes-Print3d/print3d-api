const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const LineItemSchema = mongoose.Schema({
  produk: { type: ObjectId, required: true, ref: 'Produk' },
  banyak: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('LineItem', LineItemSchema)