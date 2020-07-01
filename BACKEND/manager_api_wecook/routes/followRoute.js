var followController = require('../controller/followController')


module.exports = function(app) {



    app.post('/follows/:idUser/addFollow/:idUserFollow', followController.addFollowUser)

    app.get('/follows/:idUser', followController.getUsersFollowByIdUser)

    app.get('/follows/:idUser/isFollow/:idUserFollow' , followController.isFollow)

    app.put('/follows/:idUser/unFollow/:idUserFollow', followController.unfollow)


}