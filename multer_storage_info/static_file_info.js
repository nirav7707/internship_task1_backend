const multer = require('multer');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },

    filename: function(req, file, cb) {
        cb(null,  Date.now()+file.originalname  );
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
        cb(null,true);
    }
    else{
        cb(new Error("this file formate is not valid"),false);
    }
}

const upload =multer({storage,fileFilter});

module.exports.upload = upload;
