import http from './common'

const searchKey = (key) => {
    return http.post('/search', {key: key});
}

export default {
    searchKey
}