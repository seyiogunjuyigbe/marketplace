const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    first_name: String,
    last_name: String,
    phone_number: String, 
    avatar_url: String,
    email: String,
    isSeller: Boolean,
    isBuyer: Boolean,
    messages: [],
    favourites: [],
    purchases: [],
    seller_profile: {
        skills: [{
            name:String,
            level: String}],
        languages: [{
            name:String,
            level: String}],
        description: {
            title:String,
            description: String,
            rate: Number
            }


    }

})
module.exports = mongoose.model("User", userSchema)