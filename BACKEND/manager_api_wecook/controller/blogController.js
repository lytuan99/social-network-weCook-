const mongoose = require('mongoose');

var Blog = require('../models/blog');
var User = require('../models/user')
    

const createBlog = function(req, done) {
    let blogTmp = req.body;
    console.log("blog nay: ", blogTmp.body)

    let blog = new Blog({
        user: blogTmp.userId,
        pathImageActive: blogTmp.pathImageActive,
        title: blogTmp.title,
        raw: blogTmp.raw,
        privicy: blogTmp.privicy,
        guideSteps: blogTmp.guideSteps
    })
    blog.save((err, blog) => {
        if(err)
            return done(err, null)
        else
            return done(null, blog)
    })
    console.log("create Blog end")
}

const getAllBlog = (req, res) => {
    console.log("paging: ", req.params)
    var options = {
        sort:     { _id: -1 },
        populate: 'user',
        limit:    req.params.size,
        page: req.params.page,
      };
    Blog.paginate({}, options, (err, result) => {
        if(err){
            res.status(500).send({message: 'error server', status: false})
            return;
        }
        else{
            res.status(200).send({
                blogs: result.docs,
                totalPages: result.totalPages,
                currentPage: result.page,
                totalItems: result.totalDocs
            })
        }
    })
    
}

const updateBlog = async (req, res) => {
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    let blog = req.body
    console.log("blog: ", blog.user, idUser)
    if(blog.user.localeCompare(idUser) != 0){
        res.status(400).send({status: false, message: "Không thể update"})
        return;
    }
    return Blog.findByIdAndUpdate(idBlog, {
        title: blog.title,
        raw: blog.raw,
        guideSteps: blog.guideSteps,
        pathImageActive: blog.pathImageActive
    }, (err, doc) =>{
        if(err => {
            res.status(500).send({status: false, message: "có lỗi rồi"})
            return;
        })
        
        console.log("doc: ", doc)
        res.status(200).send({status: true, message:"Thành công!"})
    })
                

}

const getOneBlog = async (req, res) => {
    let idBlog = req.params.idBlog
    let blog = await Blog.findById(idBlog).populate('user').exec();
    if(!blog){
        res.status(404).send('not found blog')
        return;
    }

    else{
        res.status(200).send(blog);
    }

}

const changePrivicy = (req, res) => {
    let idBlog = req.params.idBlog
    let status = req.params.status
    return Blog.findByIdAndUpdate(idBlog, {privicy: status},  (err, doc) =>{
        res.status(200).send("thành công!")
    })
    
}

const getCurrentBlog = (req, res) => {
    var options = {
        sort: { _id: -1 },
        populate: 'user',
        limit: 3,
        page: 1,
      };
    Blog.paginate({}, options, (err, result) => {
        if(err){
            res.status(500).send({message: 'error server', status: false})
            return;
        }
        else{
            res.status(200).send({
                blogs: result.docs
            })
        }
    })
}

const deleteBlog = async (req, res) => {
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    let doc = await Blog.findByIdAndDelete(idBlog)
    if(doc){
        res.status(200).send({status: true, message: "xóa thành công"})
        return;
    }
    else{
        res.status(404).send({status: false,message: "error.. không tìm thấy!"})
        return;
    }
}


module.exports = {
   createBlog,
   getAllBlog,
   deleteBlog,
   updateBlog,
   getOneBlog,
   changePrivicy,
   getCurrentBlog,
   deleteBlog,






}