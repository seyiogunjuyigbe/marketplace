const mongoose = require('mongoose');
const {Schema} = mongoose;
const requirementSchema = new Schema({
    description: String,
    type: String,
    isMandatory: Boolean,
    file: String
});

module.exports = mongoose.model('Requirement', requirementSchema)