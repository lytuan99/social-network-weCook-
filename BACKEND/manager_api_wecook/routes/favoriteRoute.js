var favoriteController = require('../controller/favoriteController')

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      
    app.get(`/favorites/blogs/:idBlog/users/:idUser`, favoriteController.isRedHeath)

    app.post(`/favorites/blogs/:idBlog/users/:idUser`, favoriteController.changeColorHeath)
}