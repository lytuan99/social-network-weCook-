import http from './common'
import auHeader from '../service/auth-header'
const login = (user) =>{
   return http.post('/api/auth/login', user,
     {headers: {
        'Content-Type': 'application/json'
    }})
}

const signup = (data) => {
   return  http.post('/api/auth/signup', data, {headers: {
        'Content-Type': 'application/json'
    }})
}

const getProfile = (name) =>{
    return http.get(`/api/auth/${name}/profile`, {headers: auHeader()})
}

const getOtherProfile = (name) => {
    return http.get(`/users/${name}`);
}

const logout = () => {
    localStorage.removeItem('user')
}

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"));
}

const changeAvatarCurrentUser = (avatar) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.avatar = avatar;
    localStorage.setItem("user", JSON.stringify(user))
}

const updateUser = (idUser ,data) => {
    return http.put(`api/auth/users/${idUser}`, data);
}

const changeAvatar = (avatar, idUser) => {
    console.log(avatar)
    return http.post(`/avatar/users/${idUser}`, {avatar: avatar});
}

const getAllUser = () => {
    return http.get(`/users`)
}

const countUser = () => {
    return http.get(`/count/users`)
}

const countBlogOfUser = (idUser) => {
    return http.get(`/count/blogs/${idUser}`)
}

export default {
    login,
    signup,
    logout,
    getCurrentUser,
    changeAvatarCurrentUser,
    getProfile,
    updateUser,
    getOtherProfile,
    changeAvatar,
    getAllUser,
    countUser,
    countBlogOfUser
    
}