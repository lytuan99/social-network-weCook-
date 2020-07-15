var Blog = require('../models/blog');
var User = require('../models/user');

const search = async (req, res) => {
    // let key = req.body.key
    // let docUser = await User.find({'name': {"$regex": key, "$options": "i"}})
    // let docBlogTitle = await Blog.find({'title': {"$regex": key, "$options": "i"}})
    // let docBlogRaw = await Blog.find({'raw': {"$regex": key, "$options": "i"}})
    // res.json({user_search: docUser, blog_search_title: docBlogTitle, blog_search_raw: docBlogRaw})
}


module.exports = {
    search
}