const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    privicy :  {
        type: String,
        required: false
    },
    favorites : {
        type: Number,
        default: 0
    },
    blog_url :  {
        type: String,
        default: null
    },
    createTime :  {
        type: Date,
        default: Date.now
    },
    modifiedTime: {
        type: Date,
        default: Date.now
    },
    
    


})