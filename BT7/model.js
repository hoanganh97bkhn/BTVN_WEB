const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    yes:{
        type: Number,
        default: 0,
    },
    no:{
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
});

const questionModel = mongoose.model('question',questionSchema);
module.exports = questionModel;