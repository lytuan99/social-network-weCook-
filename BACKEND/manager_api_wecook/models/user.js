const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    },

    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]

    
});
UserSchema.index({name: 'text'})
var User = mongoose.model('User',UserSchema);

module.exports = User;