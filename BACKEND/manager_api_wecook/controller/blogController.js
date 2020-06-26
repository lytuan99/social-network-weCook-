const mongoose = require('mongoose');
var Blog = require('../models/blog/blog');
var User = require('../models/user')
var multer = require('multer');

// 

const createBlog = function(blogReq, done) {

    let blogTmp = JSON.parse(blogReq)
    
    let blog = new Blog({
        user: blogTmp.userId,
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
            return done(null, blog)
    })
    console.log("create Blog end")
}

const getAllBlog = async (req, res) => {
    let blogs = await Blog.find()
                    .populate('user')
                    .exec();
    res.status(200).send({blogs})
}
module.exports = {
   createBlog,
   getAllBlog,


}