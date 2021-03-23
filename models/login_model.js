const mongoose = require("mongoose");

const Login = mongoose.model("Login",new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
}));

module.exports = Login;