const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const blog = new mongoose.Schema({

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

blog.plugin(mongoosePaginate);
blog.index({title: 'text', raw: 'text'})
const Blog = mongoose.model("Blog", blog) 

module.exports = Blog;

