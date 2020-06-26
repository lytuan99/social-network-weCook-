const mongoose = require('mongoose');

const Blog = mongoose.model(
    "Blog", 
    new mongoose.Schema({

        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }, 

        pathImageActive:{
            type: String,
            required: true
        },
        title : {
            type: String,
            required: true
        },
        raw: {
            type: String,
            required: true
        },
        guideSteps : [
            {
                step: Number,
                guide: {
                    type: String,
                    require: true
                },
                imagePaths: [{type: String}]
            }
        ],

        privicy :  {
            type: Boolean,
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
        }
        
    })
);

module.exports = Blog;

