const Comment = require('../models/interact/Comment')


const postComment = (req, res) => {
    let idUser = req.params.idUser
    let idBlog = req.params.idBlog
    let data = req.body

    console.log("dataa: ", req.body)
    let comment = new Comment({
        content: data.content,
        user: idUser,
        blog: idBlog
    })
    comment.save((err, doc) => {
        if(err){
            res.json("không thể tải lên comment???")
            return;
        }
        res.json("comment thành cong")
    })
}

const getAllCommentOfBlog = async (req, res) => {
    let idBlog = req.params.idBlog
    let comments = await Comment.find({blog: idBlog }).populate("user", "_id name avatar")
    if(comments){
        res.status(200).send({status: true, comments})
    }
    else{
        res.status(404).send({status: false, message: "không thấy comment hoặc có lỗi"})
    }
}

module.exports = {
    postComment,
    getAllCommentOfBlog,
    

}