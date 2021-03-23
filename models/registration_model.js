const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const registrationSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true,
        maxlength:10,
        minlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});

registrationSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,name:this.name,isAdmin:this.isAdmin},"jwtprivatkey")
    return token;
}

const Registration = mongoose.model('Registration',registrationSchema);

module.exports = Registration;