import http from './common'

const postBlog = ({data}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return http.post('/blogs', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'multipart/form-data'
            // 'x-access-token': user.accessToken
        }
    })
}

const getAllBlogByIdUser = (idUser) =>{
    return http.get(`users/${idUser}/blogs`)
}

const getAllBlog = (page, size) =>{
    return http.get(`blogs?page=${page}&size=${size}`)
}

export default {
    postBlog,
    getAllBlogByIdUser,
    getAllBlog,
    
    
}