const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const comment = new mongoose.Schema({
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
    amountChild: {
        type: Number,
        default: 0
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

comment.plugin(mongoosePaginate);
const Comment = mongoose.model("Comment", comment) 

module.exports = Comment;