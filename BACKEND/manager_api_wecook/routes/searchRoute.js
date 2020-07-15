var searchController = require('../controller/searchController')

module.exports = function(app) {

    app.post('/search', searchController.search)
}