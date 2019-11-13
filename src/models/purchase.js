const mongoose = require('mongoose');
const {Schema} = mongoose;
const purchaseSchema = new Schema({
    service: String,
    owner: String,
    buyer: String,
    transaction: {
        id: String,
        intent: String,
        payer: {payment_method: String},
        transactions : [
           { amount: {
                total: Number,
                currency: String
            },
            description: String,
        related_resources: [] } ],
        create_time: Date,
        links:[{
            href: String,
            rel: String,
            method: String 
        }],
        httpStatusCode: Number    
    },
    createdAt: Date,
    status: String
})
module.exports = mongoose.model("Purchase", purchaseSchema)