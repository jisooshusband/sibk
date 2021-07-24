import axios from 'axios'
require('dotenv').config()

const axiosApiIntances = axios.create({
  baseURL: `http://localhost:3001/backend1/api/v1`
})

// request intercepto
axiosApiIntances.interceptors.request.use(
  function(config) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },

  function(error) {
    return Promise.reject(error)
  }
)

// response interceptor
axiosApiIntances.interceptors.response.use(
  function(response) {
    return response
  },
  
  function(error) {
    if (error.response.status === 403) {
      if (error.response.data.msg === 'jwt expired') {
        const refreshToken = localStorage.getItem('refreshToken')
        axiosApiIntances
          .post('auth/refresh-token', { refreshToken })
          .then((res) => {
            localStorage.setItem('token', res.data.data.token)
            window.location.reload()
          })
          .catch((err) => console.log(err))
      } else {
        localStorage.clear()
        alert('please login and verify your account first')
        window.location.href='/signin'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosApiIntances
