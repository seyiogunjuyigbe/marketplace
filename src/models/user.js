const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    phone_number: String, 
    email: String,
    isSeller: Boolean,
    isBuyer: Boolean,
    messages: []
})
module.exports = mongoose.model("User", userSchema)