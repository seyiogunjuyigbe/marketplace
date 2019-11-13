const mongoose = require('mongoose');
const {Schema} = mongoose;
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    phoneNumber: String, 
    avatarUrl: String,
    email: String,
    isSeller: Boolean,
    isBuyer: Boolean,
    messages: [],
    favourites: [],
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Purchase"
    }],
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
    },
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    }],
    transactions: []

})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema)