import http from './common'

const isRedHeath = (idUser, idBlog) => {
    return http.get(`/favorites/blogs/${idBlog}/users/${idUser}`)
}

const changeColorHeath =  (idUser, idBlog, favorite) => {
    return http.post(`/favorites/blogs/${idBlog}/users/${idUser}`,{favorite: favorite})
}

export default {
    isRedHeath,
    changeColorHeath,

}