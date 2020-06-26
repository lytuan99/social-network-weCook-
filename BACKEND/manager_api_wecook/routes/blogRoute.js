var express = require('express');
var router = express.Router();
var multer = require('multer');
var blogController = require('../controller/blogController');
const {authJwt} = require('../middleWare/index');
const PATH_UPLOAD = 'C:/Users/lytua/Desktop/PROJECT_II_WECOOK/FRONTEND/wecook/public/imagesUpload';

// post ảnh
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, PATH_UPLOAD)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
var upload = multer({storage: storage})

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post('/blogs', 
        upload.any(),
        (req, res, next) => {
            // authJwt.verifyToken(req, res, next)
            console.log(req)
            const blog = req.blog;
            blogController.createBlog(blog, (err, result) => {
                if(!result){
                    res.json({error: err, status: false})
                    return;
                }
                else{
                    res.json({status: true, blog: result})
                    console.log('D O N E post blog');
                    return;
                }
            })
    })

    app.get('/blogs', blogController.getAllBlog);



}

