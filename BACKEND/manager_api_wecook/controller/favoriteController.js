const Favorites = require('../models/interact/Favorites')
const Blog = require('../models/blog')
const User = require('../models/user')
const constanst = require('../constants/index')
const isRedHeath = (req, res) => {
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    Favorites.findOne({ user: idUser, blog: idBlog }, (err, doc) => {
        if (err || doc == null) {
            res.json({ isRedHeath: false, message: "chưa like" })
            return;
        }
        res.json({ isRedHeath: true, message: "đã like nha!" })
    })
}

const changeColorHeath = async (req, res) => {
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    let favorite = req.body.favorite
    // console.log("favorite: ", favorite)
    let doc = await Favorites.findOne({ user: idUser, blog: idBlog })
    if (doc == null) {
        let fav = new Favorites({
            user: idUser,
            blog: idBlog
        })
        fav.save()
        let doc2 = await Blog.findByIdAndUpdate(idBlog, { favorites: Number(favorite + 1)})
        if (doc2) {
            let userTuna = await User.findById(doc2.user, "tuna");
            User.findByIdAndUpdate(doc2.user, {tuna: userTuna.tuna + constanst.TUNA_FAVORITE})
            res.json({ isRedHeath: true, message: "đã like" })
        }
        else
            res.json({ status: false, message: "đã falied" })
    }
    else {
        let doc1 = await Favorites.findOneAndDelete({ user: idUser, blog: idBlog })
        if (doc1) {
           let doc2 = await Blog.findByIdAndUpdate(idBlog, { favorites: Number(favorite - 1)})
            if (doc2) {
                let userTuna = await User.findById(doc2.user, "tuna");
                User.findByIdAndUpdate(doc2.user, {tuna: userTuna.tuna - constanst.TUNA_FAVORITE})   // cộng điểm tuna khi được ưa thích trên bài viết
                res.json({ isRedHeath: false, message: "bỏ like!" })
                return;
            }
            else
                res.json({ status: false, message: "failed!" })
        }
    }
}

module.exports = {
    isRedHeath,
    changeColorHeath

}