const mongoose = require('mongoose');
const {Schema} = mongoose;
const messageSchema = new Schema({
    sender: String,
    recipient: String,
    body: String,
    sentAt: Date,
    isSent: Boolean,
    isDelivered: Boolean,
    isRead: Boolean
});

module.exports = mongoose.model("Message", messageSchema)