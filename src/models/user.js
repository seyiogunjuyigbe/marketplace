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
    joinDate: Date,
    messages: [],
    favourites: [],
    purchases: [],
    orders: [],
    balance:{type: Number, default: 0},
    seller_profile: {
        skills: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }],
        languages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Language"
        }],
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