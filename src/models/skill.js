const mongoose = require('mongoose');
const {Schema} = mongoose;
const skillSchema = new Schema({
    name:String,
    level: String
});

module.exports = mongoose.model("Skill", skillSchema)