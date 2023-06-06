const mongoose = require('mongoose');

const crudScema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    director : {
        type : String,
        required : true
    },
    writer : {
        type : String,
        required : true
    },
    actors : {
        type : String,
        required : true
    },
    language : {
        type : Array,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    },
});

const crud = mongoose.model('crud',crudScema);
module.exports = crud;

