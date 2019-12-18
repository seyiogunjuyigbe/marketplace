const mongoose = require('mongoose');
const {Schema} = mongoose;
const serviceSchema = new Schema({
    createdBy: String,
    seller: String,
    createdAt : Date,
    title: String,
    description: String,
    category: String,
    subCategory: String,
    tags: [],
    decription: String,
    faqs:[{
        question: String,
        answer: String
    }],
    isPrivate: Boolean,
    price: Number,
    currency: {type:String, default: "USD"},
    deliveryTime: Number,
    revisionCount: String,
    extras: [{
        title: String,
        description: String,
        cost: Number
    }],
    requirements: [{
        description: String,
        type: String,
        isMandatory: Boolean,
        file: String
    }],
    thumbnails: [{
        src: String,
        type: String
    }],
    videos: [{
        src: String,
        type: String
    }],
    orderedBy: String,
    client: String,
    paymentstatus: String,
    projectStatus: String,
    deliveryStatus: String,
    orderDate :Date
});

module.exports = mongoose.model("Service", serviceSchema)


