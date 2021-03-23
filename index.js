const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")

const registration_router = require("./routes/registration");
const login_router = require("./routes/login");
const artical = require("./routes/articals");

mongoose.connect("mongodb+srv://Nirav:12345Qwert@cluster0.4c6sw.mongodb.net/crud?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("connection successfull"))
    .catch((err)=>console.log(err))

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"))
app.use("/api/registration",registration_router);
app.use("/api/login",login_router);
app.use("/api/articals",artical);

app.listen(8888,()=>{
    console.log("test")
})