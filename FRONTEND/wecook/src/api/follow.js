import http from './common'

const addFollow = (idUser, idUserFollow) => {
    return http.post(`/follows/${idUser}/addFollow/${idUserFollow}`)
}

const getListFollow = (idUser) => {
    return http.get(`/follows/${idUser}`)
}

const isFollow = (idUser, idUserFollow) => {
    return http.get(`/follows/${idUser}/isFollow/${idUserFollow}`)
}

const unFollow = (idUser, idUserFollow) => {
    return http.put(`/follows/${idUser}/unFollow/${idUserFollow}`)
}

export default {
    addFollow, 
    getListFollow,
    isFollow,
    unFollow
}