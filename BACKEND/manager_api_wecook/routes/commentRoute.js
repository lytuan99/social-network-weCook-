var commentController = require('../controller/commentController')

module.exports = function(app) {
    
    app.post('/blogs/:idBlog/users/:idUser/comments', commentController.postComment)
    
    app.get('/comments/blogs/:idBlog', commentController.getAllCommentOfBlog)
}