const mongoose = require('mongoose');

const follow = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    userFollows: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
})

const Follow = mongoose.model("Follow", follow) 

module.exports = Follow;