const mongoose = require('mongoose');

let URL = "mongodb://127.0.0.1:27017/weCook";

 var connectDB = async () => {
     await mongoose.connect(URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true
        }, (err) => {
        if(err){
            console.log("error can not connect!!!");
            throw err;
        }
        console.log("------------------Connected!----------------------");
    })
 } 

module.exports = connectDB;