const mongoose = require('mongoose');

let URL = "mongodb+srv://Lytuan:meodenlongtrang@wecook-zf9wh.gcp.mongodb.net/weCook?retryWrites=true&w=majority";

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