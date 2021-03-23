const mongoose = require("mongoose")
const Articals = mongoose.model("Articals",new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    articalImage:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    auther:{
        type:String,
        required:true
    },
    autherId:{
        type:String,
        required:true
    },
    timeToRead:{
        type:String,
        required:true
    }

}));

module.exports = Articals;