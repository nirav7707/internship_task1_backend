const express = require("express");
const router = express.Router();
const Articals = require('../models/articals_model')
const {upload}=require("../multer_storage_info/static_file_info");


router.get("/",async(req,res)=>{
    const articals = await Articals.find();
    res.send(articals).status(200);
});

router.get("/:id",async(req,res)=>{
    const articals = await Articals.findById(req.params.id);
    res.send(articals).status(200);
});

router.put("/", upload.single('articalImage'),async (req,res)=>{
    const artical = req.body;
    artical.articalImage = req.file.path;
    const newArtical = await Articals.create(artical);
    res.send(newArtical).status(200);
});

router.put("/:id", upload.single('articalImage'),async (req,res)=>{
    const artical = req.body;
    artical.articalImage = req.file.path;
    const newArtical = await Articals.findByIdAndUpdate(req.params.id,artical,{new:true});
    res.send(newArtical).status(200);
})

module.exports = router;