const mongoose = require('mongoose');

const Content = mongoose.model(
    "Content",
    new mongoose.Schema({
        step: Number,
        guide: {
            type: String,
            require: true
        },
        image: [{type: String}]
    })
)

module.exports = Content;