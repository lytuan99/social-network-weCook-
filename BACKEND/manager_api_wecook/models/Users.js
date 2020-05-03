const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : {   
        type: String,
        required : true
    },
    password:{
        type: String,
        required : false
    },
    gender : {
        type: String,
        required : true
    },
    birthday : {
        type: String,
        required : false
    },
    city : {
        type: String,
        required : false
    },
    email : {
        type: String,
        required : true
    },
    phoneNumber: {
        type: Number,
        required : true
    },
    avatar : {
        type: String,
        required : false
    },
    tuna : {
        type: Number,
        required : false,
        default: 0
    },
    createTime : {
        type: Date,
        default: Date.now
    },
    modifiedTime : {
        type: Date,
        default: Date.now
    }
});
var User = mongoose.model('User',UserSchema);

const createUser = function(userReq, done){
    let user = new User({
        name : userReq.name,
        password : userReq.pass,
        gender : userReq.gender,
        birthday: userReq.birthday,
        city: userReq.city,
        email: userReq.email,
        phoneNumber: userReq.phoneNumber,
        
    })
    console.log("tessssst : ");
    console.log(user);
    
    user.save((err, user) =>{
        if(err)
            return done(err, null);
        return done(err, user);
    })

}



module.exports = {User,
                createUser
                };