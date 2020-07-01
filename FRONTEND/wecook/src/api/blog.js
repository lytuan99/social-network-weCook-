import http from './common'

const postBlog = (data) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.post('/blogs', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const getAllBlogByIdUser = (idUser) =>{
    return http.get(`users/${idUser}/blogs`)
}

const getAllBlog = (page, size) =>{
    return http.get(`blogs/${page}/${size}`)
}

const getOneBlog = (userName, idBlog) => {
    return http.get(`blogs/${idBlog}`)
} 

const postImagesBlog = (data) => {
    return http.post(`blogs/images`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

const changePrivicy = (status, idBlog) => {
    return http.put(`blogs/${idBlog}/privicy/${status}`)
}


const deleteBlog = (idBlog, idUser) => {
    return http.post(`users/${idUser}/blogs/${idBlog}/delete`)
}

const updateBlog = (idUser, idBlog, blog) => {
    console.log(blog)
    return http.put(`users/${idUser}/blogs/${idBlog}`, blog)
}

const getCurrentBlog = () => {
    return http.get(`current/blogs`)
}

export default {
    postBlog,
    getAllBlogByIdUser,
    getAllBlog,
    getOneBlog,
    postImagesBlog,
    changePrivicy,
    deleteBlog,
    updateBlog,
    getCurrentBlog


    
    
}