var express = require('express');
var router = express.Router();
var multer = require('multer');
var blogController = require('../controller/blogController');

router.get('/', (req, res) => {
    res.send('this is all of blogs');
})

router.get('/:idUser', (req, res) => {
    
})

router.get('/:idBlog', (req, res) => {

})

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

router.post('/', upload.any(), (req, res) => {
    const images = req.images;
    const blog = req.body.blog;
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
module.exports = router;