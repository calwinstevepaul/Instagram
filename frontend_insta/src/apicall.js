import axios from 'axios'
const baseURL = 'http://localhost:9000'

export const plainApi = axios.create({baseURL})
export const authApi = axios.create({baseURL})

authApi.interceptors.request.use(config => {
    config.headers['token'] = localStorage.getItem('token')
    return config
})

authApi.interceptors.response.use(
    config => config, error => {
    const { response: {status} } = error
    if (status === 401) {
        window.localStorage.clear()
        window.history.go('/')
    }
    return Promise.reject(error)
})