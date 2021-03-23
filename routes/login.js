const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt")

const Registration = require("../models/registration_model");


router.post("/",async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let user = await Registration.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Invalid Email Or a Password")

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send("Invalid Email Or Password")

    const token = user.generateAuthToken();
    res.send(token);
});

function validateUser(user){
    const Schema = {
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(8).max(255).required()
    }

    return Joi.validate(user,Schema);
}

module.exports = router;