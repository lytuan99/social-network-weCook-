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

    app.post('/blogs/images', upload.any(), (req, res) => {
        res.json({status: true, message: "OK nha"})
    });

    app.get('/blogs/:page/:size', blogController.getAllBlog);

    app.get('/blogs/:idBlog', blogController.getOneBlog);

    app.put('/blogs/:idBlog/privicy/:status', blogController.changePrivicy)

    app.post('/users/:idUser/blogs/:idBlog/delete', blogController.deleteBlog)

    app.put('/users/:idUser/blogs/:idBlog', blogController.updateBlog)

    app.get('/current/blogs', blogController.getCurrentBlog)

    app.delete('/blogs', blogController.deleteBlog)

    app.post('/blogs', (req, res) => {
        console.log(req.body)
        blogController.createBlog(req, (err, result) => {
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
      }
    )


    
}

