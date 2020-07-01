const Favorites = require('../models/interact/Favorites')
const Blog = require('../models/blog')
const isRedHeath = (req, res) =>{
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    Favorites.findOne({user: idUser, blog: idBlog}, (err, doc) => {
        if(err || doc == null){
            res.json({isRedHeath: false, message: "chưa like"})
            return;
        }
        res.json({isRedHeath: true, message: "đã like nha!"})
            
    })
}

const changeColorHeath = (req, res) => {
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    let favorite = req.body.favorite
    console.log("favorite: ", favorite)
    Favorites.findOne({user: idUser, blog: idBlog}, (err, doc) => {
        console.log("doc: ", doc)
        if(doc == null){
            let fav = new Favorites({
                user: idUser,
                blog: idBlog
            })
            fav.save(() => {
                Blog.findByIdAndUpdate(idBlog,{favorites: Number(favorite + 1)}, (err, doc) => {
                    if(doc){
                        res.json({isRedHeath: true, message: "đã like"})
                    }
                    else
                    res.json({status: false, message: "đã falied"})
                } )
                return;
            });
            
        }
        else{
            console.log("da like ...")
            Favorites.findOneAndDelete({user: idUser, blog: idBlog}, (err, resp) => {
                if(resp){
                    Blog.findByIdAndUpdate(idBlog,{favorites: Number(favorite - 1)}, (err, doc) => {
                        console.log("update res: ", doc)
                        if(doc){
                            res.json({isRedHeath: false, message: "bỏ like!"})
                            return;
                        }
                        else 
                            res.json({status: false, message: "failed!"})

                    } )
                }
            })
            

        }
            
    })

}

module.exports = {
    isRedHeath,
    changeColorHeath

}