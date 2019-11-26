const mongoose = require('mongoose');
const {Schema} = mongoose;
const purchaseSchema = new Schema({
    title: String,
    serviceID: String,
    sellerID: String,
    seller: String,
    buyerID: String,
    buyer: String,
    transaction: String,
    balance_transaction: String,
    createdAt: Date,
    status: String,
    projectStatus : String,
    deliveryTime: Number, 
    deliveryStatus: String
})
module.exports = mongoose.model("Purchase", purchaseSchema)