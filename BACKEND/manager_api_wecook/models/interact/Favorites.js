const mongoose = require('mongoose');

const favorite = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }, 
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }, 
})

const Favorite = mongoose.model("Favorite", favorite) 

module.exports = Favorite;