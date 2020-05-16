const mongoose = require('mongoose');
var Blog = require('../models/blog/Blogs');

const createBlog = (blogReq, done) => {

    let blog = new Blog({
        title: blogReq.title,
        privicy: blogReq.privicy,
        contenSteps: blogReq.contenSteps
    })

    console.log(blog)
    blog.save((err, blog) => {
        if(err)
            return done(err, null)
        else
            return done(err, blog)
    })

}   