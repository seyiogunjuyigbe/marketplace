const mongoose = require('mongoose');
const {Schema} = mongoose;
const languageSchema = new Schema({
    name:String,
    level: String
});

module.exports = mongoose.model("Language", languageSchema)