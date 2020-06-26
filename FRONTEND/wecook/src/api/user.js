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

const logout = () => {
    localStorage.removeItem('user')
}

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"));
}


export default {
    login,
    signup,
    logout,
    getCurrentUser,
    getProfile,
}