const mongoose = require('mongoose');

const Blog = mongoose.model(
    "Blog", 
    new mongoose.Schema({
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
                image: [{type: String}]
            }
        ],

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
        }
    })
);

module.exports = Blog;

