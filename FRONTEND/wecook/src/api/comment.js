import http from './common'

const postComment = (idBlog, idUser, comment) => {
    return http.post(`/blogs/${idBlog}/users/${idUser}/comments`, comment)
}

const getAllCommentOfBlog = (idBlog) => {
    return http.get(`/comments/blogs/${idBlog}`)
}

export default {
    postComment,
    getAllCommentOfBlog,

}