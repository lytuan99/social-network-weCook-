const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const commentChild = new mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }, 
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }, 
    comment: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
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

commentChild.plugin(mongoosePaginate);
const CommentChild = mongoose.model("CommentChild", commentChild) 

module.exports = CommentChild;