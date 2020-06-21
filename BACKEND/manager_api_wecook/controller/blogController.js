const mongoose = require('mongoose');
var Blog = require('../models/blog/Blogs');
var multer = require('multer');

// 

const createBlog = function(blogReq, done) {

    let blogTmp = JSON.parse(blogReq)
    let blog = new Blog({
        pathImageActive: blogTmp.pathImageActive,
        title: blogTmp.title,
        raw: blogTmp.raw,
        privicy: blogTmp.privicy,
        guideSteps: blogTmp.guideSteps
    })
    
    console.log("blog: " + blog)
    blog.save((err, blog) => {
        if(err)
            return done(err, null)
        else
            return done(err, blog)
    })
    console.log("create Blog end")

}   


module.exports = {
   createBlog
}