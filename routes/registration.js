const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const path = require('path');
const Joi=require("joi");

const Registration = require("../models/registration_model");
const {upload}=require("../multer_storage_info/static_file_info");

router.get("/",async (req, res) => {
    const users = await Registration.find();
    res.send(users).status(200);
})

router.post("/",async (req, res) => {
    try{
        console.log("this is req bosy",req.body);
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message)
    
        let user = await Registration.findOne({email:req.body.email})
        if(user) return res.status(400).send("user already registered")
    
        let userinfo = req.body;
        const salt = await bcrypt.genSalt(10);
        userinfo.password = await bcrypt.hash(req.body.password,salt)
    
        user = await Registration.create(userinfo);
        const token = user.generateAuthToken();
        const responce = {
            name:user.name,
            _id:user._id,
            email:user.email,
            token
        }
        res.send(responce)
    }catch(er){
        res.status(400).send("bad request");
    }
});

router.put("/:id", async (req, res) => {

    var data = req.body
    const user = await Registration.findByIdAndUpdate(req.params.id,data,{new:true});
    if(!user) return res.status(400).send("user not registered");

    res.send(user);
});

router.delete("/:id",async (req, res) => {
    const user = await Registration.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).send("user does't exist")

    res.send(user);
})

//user validation
function validate(user){
    const Schema={
        email:Joi.string().min(5).max(255).email(),
        password:Joi.string().min(8).max(255).required(),
        name:Joi.string().max(255).required(),
        surname:Joi.string().max(255).required(),
        fathername:Joi.string().max(255).required(),
        number:Joi.number().required(),
    };
    return Joi.validate(user,Schema);
}

module.exports = router;
